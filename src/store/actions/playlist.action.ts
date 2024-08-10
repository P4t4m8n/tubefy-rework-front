import {
  IPlaylist,
  IPlaylistObject,
  ISetMainPlaylistsAction,
  ISetUserPlaylistsAction,
  SET_MAIN_PLAYLISTS,
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
    let playlists = await playlistService.getUserPlaylists();
    if (!playlists) playlists = [];
    store.dispatch(setUserPlaylists(playlists));
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
