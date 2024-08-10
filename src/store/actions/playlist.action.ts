import {
  IPlaylist,
  IPlaylistObject,
  ISetMainPlaylistsAction,
  ISetUserLikedPlaylistsAction,
  ISetUserLikedSongsAction,
  ISetUserPlaylistsAction,
  SET_MAIN_PLAYLISTS,
  SET_USER_LIKED_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_USER_PLAYLISTS,
} from "../../models/playlist.model";
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
  playlists: IPlaylist[]
): ISetUserPlaylistsAction => ({
  type: SET_USER_PLAYLISTS,
  payload: playlists,
});

export const setUserLikedPlaylist = (
  playlists: IPlaylist[]
): ISetUserLikedPlaylistsAction => ({
  type: SET_USER_LIKED_PLAYLISTS,
  payload: playlists,
});

export const setUserLikedSongs = (
  playlist: IPlaylist
): ISetUserLikedSongsAction => ({
  type: SET_USER_LIKED_SONGS,
  payload: playlist,
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

export const loadUserPlaylists = async (): Promise<IPlaylist[]> => {
  try {
    let playlists = await playlistService.getUserPlaylists();
    if (!playlists) playlists = [];
    return playlists;
  } catch (error) {
    console.error(`Error while loading user playlists: ${error}`);
    return [];
  }
};
