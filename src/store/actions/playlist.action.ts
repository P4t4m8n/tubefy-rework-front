import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistsGroup,
  ISetLikedPlaylistAction,
  ISetUserPlaylistsAction,
  SET_LIKED_PLAYLIST,
  SET_PLAYLISTS_BULK,
  SET_USER_PLAYLISTS,
} from "../../models/playlist.model";
import { ISong } from "../../models/song.model";
import { storeSessionData } from "../../services/localSession.service";
import { playlistService } from "../../services/playlist.service";
import { playlistsToPlaylistsGroup } from "../../util/playlist.util";
import { utilService } from "../../util/util.util";
import { store } from "../store";
import { removeNotification } from "./notification.action";

export const loadDefaultPlaylists = async (): Promise<IPlaylistsGroup[]> => {
  try {
    const playlists = await playlistService.getDefaultStations();
    if (!playlists)
      throw new Error("No playlists found in default contact support");

    const playlistsObject: IPlaylistsGroup[] =
      playlistsToPlaylistsGroup(playlists);
    return playlistsObject;
  } catch (error) {
    utilService.handleError(
      "default-playlists",
      "GENERAL_ERROR",
      error as Error
    );
    return [];
  }
};

export const loadUserPlaylists = (
  userPlaylists: IPlaylistDetailed[],
  likedPlaylist: IPlaylistDetailed
): void => {
  try {
    storeSessionData<IPlaylistDetailed[]>("playlists", userPlaylists);
    storeSessionData<IPlaylistDetailed>("likedPlaylist", likedPlaylist);
    store.dispatch(
      setPlaylistsBulk({
        userPlaylists,
        likedPlaylist,
      })
    );
  } catch (error) {
    utilService.handleError("user-playlists", "GENERAL_ERROR", error as Error);
  }
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

    storeSessionData("playlists", userPlaylists);
    store.dispatch(setUserPlaylists(userPlaylists));
    return savedPlaylist.id!;
  } catch (error) {
    utilService.handleError("playlist-save", "GENERAL_ERROR", error as Error);
  }
};

export const updateUserPlaylists = (playlist: IPlaylistDetailed) => {
  try {
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
  } catch (error) {
    utilService.handleError("playlist-update", "GENERAL_ERROR", error as Error);
  }
};

export const updateUserLikedSongPlaylist = (song: ISong) => {
  try {
    const userLikedSongsPlaylist = store.getState().playlists.likedPlaylist;
    if (!userLikedSongsPlaylist) return;

    let idx = -1;
    const songs =
      userLikedSongsPlaylist.songs?.map((_song, index) => {
        if (_song.id === song.id) idx = index;
        return _song;
      }) || [];

    if (idx === -1) {
      songs.push(song);
    } else {
      songs.splice(idx, 1);
    }

    store.dispatch(
      setUserLikedSongsPlaylist({ ...userLikedSongsPlaylist, songs })
    );
    storeSessionData("likedPlaylist", { ...userLikedSongsPlaylist, songs });
  } catch (error) {
    utilService.handleError("liked-playlist", "GENERAL_ERROR", error as Error);
  }
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
    storeSessionData("playlists", userPlaylists);
  } catch (error) {
    utilService.handleError("playlist-delete", "GENERAL_ERROR", error as Error);
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

    const updatedPlaylists = userPlaylists.map((playlist) => {
      if (playlist.id === playlistId) {
        const songExists = playlist.songs.some((_song) => _song.id === song.id);
        if (songExists) throw new Error("Song already exists in playlist");

        return {
          ...playlist,
          songs: [...playlist.songs, song],
        };
      }

      return playlist;
    });

    store.dispatch(setUserPlaylists(updatedPlaylists));
    storeSessionData("playlists", updatedPlaylists);
  } catch (error) {
    utilService.handleError(
      "playlist-add-song",
      "GENERAL_ERROR",
      error as Error
    );
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

    const updatedPlaylists = userPlaylists.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter((_song) => _song.id !== songId),
        };
      }

      return playlist;
    });

    store.dispatch(setUserPlaylists(updatedPlaylists));
    storeSessionData("playlists", updatedPlaylists);
  } catch (error) {
    console.error(`Error while removing song from playlist: ${error}`);
  }
};

export const approveSharePlaylist = async (
  playlistId: string,
  notificationId: string
) => {
  try {
    const playlist = await playlistService.approveSharedPlaylist(
      playlistId,
      notificationId
    );
    updateUserPlaylists(playlist);
    removeNotification(notificationId);
  } catch (error) {
    utilService.handleError("playlist-share", "PLAYLIST_SHARE", error as Error);
  }
};

export const rejectSharedPlaylist = async (
  playlistId: string,
  notificationId: string
) => {
  try {
    await playlistService.rejectSharedPlaylist(playlistId, notificationId);
    removeNotification(notificationId);
    utilService.handleSuccess("Playlist removed", "PLAYLIST_SHARE");
  } catch (error) {
    utilService.handleError("playlist-share", "PLAYLIST_SHARE", error as Error);
  }
};

export const addSongFromSocket = (playlistId?: string, song?: ISong|null) => {
  try {
    if (!playlistId || !song) throw new Error("Playlist id or song not found");
    const userPlaylists = store.getState().playlists.userPlaylists;

    const updatedUserPlaylist = userPlaylists.map((playlist) => {
      return playlist.id === playlistId
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist;
    });
    storeSessionData("playlists", updatedUserPlaylist);
    store.dispatch(setUserPlaylists(updatedUserPlaylist));
  } catch (error) {
    utilService.handleError(
      "playlist-add-song",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const setUserPlaylists = (
  playlists: IPlaylistDetailed[]
): ISetUserPlaylistsAction => ({
  type: SET_USER_PLAYLISTS,
  payload: playlists,
});

const setUserLikedSongsPlaylist = (
  playlist: IPlaylistDetailed
): ISetLikedPlaylistAction => ({
  type: SET_LIKED_PLAYLIST,
  payload: playlist,
});

const setPlaylistsBulk = (playlists: {
  userPlaylists: IPlaylistDetailed[];
  likedPlaylist: IPlaylistDetailed;
}) => ({
  type: SET_PLAYLISTS_BULK,
  payload: playlists,
});
