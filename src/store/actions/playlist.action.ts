import {
  ILikedSongPlaylist,
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistObject,
  ISetLikedPlaylistAction,
  ISetMainPlaylistsAction,
  ISetUserPlaylistsAction,
  SET_LIKED_PLAYLIST,
  SET_MAIN_PLAYLISTS,
  SET_PLAYLISTS_BULK,
  SET_USER_PLAYLISTS,
} from "../../models/playlist.model";
import { ISong } from "../../models/song.model";
import { playlistService } from "../../services/playlist.service";
import { playlistsToPlaylistObjects } from "../../util/playlist.util";
import { store } from "../store";

export const setMainPlaylists = (
  playlists: IPlaylistObject[]
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
  playlist: ILikedSongPlaylist
): ISetLikedPlaylistAction => ({
  type: SET_LIKED_PLAYLIST,
  payload: playlist,
});

export const setPlaylistsBulk = (playlists: {
  userPlaylists: IPlaylistDetailed[];
  likedPlaylist: ILikedSongPlaylist;
}) => ({
  type: SET_PLAYLISTS_BULK,
  payload: playlists,
});

export const loadDefaultPlaylists = async (): Promise<void> => {
  try {
    const playlists = await playlistService.getDefaultStations();
    if (!playlists)
      throw new Error("No playlists found in default contact support");

    const playlistsObject: IPlaylistObject[] =
      playlistsToPlaylistObjects(playlists);
    store.dispatch(setMainPlaylists(playlistsObject));
  } catch (error) {
    console.error(`Error while loading default playlists: ${error}`);
  }
};

export const loadUserPlaylists = async (): Promise<void> => {
  try {
    const playlists = await playlistService.getUserPlaylists();
    store.dispatch(
      setPlaylistsBulk({
        userPlaylists: playlists.OwnedPlaylist,
        likedPlaylist: playlists.likedSongsPlaylist,
      })
    );
  } catch (error) {
    console.error(`Error while loading user playlists: ${error}`);
  }
};

export const saveUserPlaylist = async (playlist: IPlaylist): Promise<void> => {
  try {
    const savedPlaylist = await playlistService.save(playlist);
    const userPlaylists = store
      .getState()
      .playlists.userPlaylists.splice(1, 0, savedPlaylist);

    store.dispatch(setUserPlaylists(userPlaylists));
  } catch (error) {
    console.error(`Error while saving user playlist: ${error}`);
  }
};

export const updateUserLikedSongPlaylist = (song: ISong) => {
  const userLikedSongsPlaylist = store.getState().playlists.likedPlaylist;
  if (!userLikedSongsPlaylist) return;

  const idx = userLikedSongsPlaylist.songs.findIndex(
    (_song) => _song.id === song.id
  );

  if (idx === -1) {
    userLikedSongsPlaylist.songs.push(song);
  } else {
    userLikedSongsPlaylist.songs.splice(idx, 1);
  }

  store.dispatch(setUserLikedSongsPlaylist(userLikedSongsPlaylist));
};
