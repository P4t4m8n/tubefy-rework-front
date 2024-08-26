import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistsGroup,
  ISetLikedPlaylistAction,
  ISetMainPlaylistsAction,
  ISetUserPlaylistsAction,
  SET_LIKED_PLAYLIST,
  SET_MAIN_PLAYLISTS,
  SET_PLAYLISTS_BULK,
  SET_USER_PLAYLISTS,
} from "../../models/playlist.model";
import { ISong } from "../../models/song.model";
import { showUserMsg } from "../../services/eventEmitter";
import { storeSessionData } from "../../services/localSession.service";
import { playlistService } from "../../services/playlist.service";
import { playlistsToPlaylistsGroup } from "../../util/playlist.util";
import { store } from "../store";

export const setMainPlaylists = (
  playlists: IPlaylistsGroup[]
): ISetMainPlaylistsAction => ({
  type: SET_MAIN_PLAYLISTS,
  payload: playlists,
});

export const setUserPlaylists = (
  playlists: IPlaylistDetailed[]
): ISetUserPlaylistsAction => ({
  type: SET_USER_PLAYLISTS,
  payload: playlists,
});

export const setUserLikedSongsPlaylist = (
  playlist: IPlaylistDetailed
): ISetLikedPlaylistAction => ({
  type: SET_LIKED_PLAYLIST,
  payload: playlist,
});

export const setPlaylistsBulk = (playlists: {
  userPlaylists: IPlaylistDetailed[];
  likedPlaylist: IPlaylistDetailed;
}) => ({
  type: SET_PLAYLISTS_BULK,
  payload: playlists,
});

export const loadDefaultPlaylists = async (): Promise<IPlaylistsGroup[]> => {
  try {
    const playlists = await playlistService.getDefaultStations();
    if (!playlists)
      throw new Error("No playlists found in default contact support");

    const playlistsObject: IPlaylistsGroup[] =
      playlistsToPlaylistsGroup(playlists);
    return playlistsObject;
  } catch (error) {
    showUserMsg({
      text: "Failed to load playlists",
      type: "general-error",
      status: "error",
    });
    return [];
  }
};

export const loadUserPlaylists = (
  userPlaylists: IPlaylistDetailed[],
  likedPlaylist: IPlaylistDetailed
): void => {
  store.dispatch(
    setPlaylistsBulk({
      userPlaylists,
      likedPlaylist,
    })
  );
};

export const saveUserPlaylist = async (
  playlist: IPlaylist
): Promise<string | undefined> => {
  try {
    const savedPlaylist = await playlistService.save(playlist);
    const userPlaylists = [...store.getState().playlists.userPlaylists];

    const idx = userPlaylists.findIndex(
      (playlists) => playlists.id === savedPlaylist.id
    );

    if (idx >= 0) {
      userPlaylists.toSpliced(idx, 1, savedPlaylist);
    } else {
      userPlaylists.push(savedPlaylist);
    }

    store.dispatch(setUserPlaylists(userPlaylists));
    return savedPlaylist.id!;
  } catch (error) {
    console.error(`Error while saving user playlist: ${error}`);
    throw new Error("Failed to save playlist, please try again later");
  }
};

export const updateUserPlaylists = (playlist: IPlaylistDetailed) => {
  const userPlaylists = [...store.getState().playlists.userPlaylists];

  if (!userPlaylists) return;

  const idx = userPlaylists.findIndex(
    (_playlist) => _playlist.id === playlist.id
  );

  if (idx === -1) {
    store.dispatch(setUserPlaylists([...userPlaylists, playlist]));
    storeSessionData("playlists", [...userPlaylists, playlist]);
  } else {
    userPlaylists.splice(idx, 1);
    store.dispatch(setUserPlaylists([...userPlaylists]));
    storeSessionData("playlists", [...userPlaylists]);
  }
};

export const updateUserLikedSongPlaylist = (song: ISong) => {
  const userLikedSongsPlaylist = store.getState().playlists.likedPlaylist;

  if (!userLikedSongsPlaylist) return;

  const songs = userLikedSongsPlaylist.songs?.map((_song) => _song) || [];

  const idx = songs.findIndex((_song) => _song.id === song.id);

  if (idx === -1) {
    songs.push(song);
  } else {
    songs.splice(idx, 1);
  }

  store.dispatch(
    setUserLikedSongsPlaylist({ ...userLikedSongsPlaylist, songs })
  );
  storeSessionData("likedPlaylist", { ...userLikedSongsPlaylist, songs });
};

export const deletePlaylist = async (playlistId: string): Promise<void> => {
  try {
    const isRemoved = await playlistService.remove(playlistId);
    if (!isRemoved)
      throw new Error(`Failed to delete playlist with id: ${playlistId} `);
    const userPlaylists = [...store.getState().playlists.userPlaylists];

    const idx = userPlaylists.findIndex(
      (playlist) => playlist.id === playlistId
    );

    userPlaylists.splice(idx, 1);

    store.dispatch(setUserPlaylists(userPlaylists));
  } catch (error) {
    console.error(`Error while deleting playlist: ${error}`);
  }
};

export const addSongToPlaylist = async (playlistId: string, song: ISong) => {
  try {
    const isAdded = await playlistService.addSong(playlistId, song.id);
    if (!isAdded) {
      throw new Error(`Failed to add song to playlist: ${playlistId}`);
    }

    const state = store.getState();
    const userPlaylists = state.playlists.userPlaylists;

    // Map through the playlists and update the specific one immutably
    const updatedPlaylists = userPlaylists.map((playlist) => {
      if (playlist.id === playlistId) {
        // Check if song already exists
        const songExists = playlist.songs.some((_song) => _song.id === song.id);
        if (songExists) throw new Error("Song already exists in playlist");

        // Return a new playlist object with updated songs
        return {
          ...playlist,
          songs: [...playlist.songs, song],
        };
      }

      // Return unchanged playlist
      return playlist;
    });

    store.dispatch(setUserPlaylists(updatedPlaylists));
  } catch (error) {
    console.error(`Error while adding song to playlist: ${error}`);
  }
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string,
  isOwnerId: string
) => {
  try {
    const isRemoved = await playlistService.removeSong(
      playlistId,
      songId,
      isOwnerId
    );
    if (!isRemoved) {
      throw new Error(`Failed to remove song from playlist: ${playlistId}`);
    }

    const state = store.getState();
    const userPlaylists = state.playlists.userPlaylists;

    // Map through the playlists and update the specific one immutably
    const updatedPlaylists = userPlaylists.map((playlist) => {
      if (playlist.id === playlistId) {
        // Return a new playlist object with updated songs
        return {
          ...playlist,
          songs: playlist.songs.filter((_song) => _song.id !== songId),
        };
      }

      // Return unchanged playlist
      return playlist;
    });

    store.dispatch(setUserPlaylists(updatedPlaylists));
  } catch (error) {
    console.error(`Error while removing song from playlist: ${error}`);
  }
};
