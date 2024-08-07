import {
  IPlaylistObject,
  ISetMainPlaylistsAction,
  SET_MAIN_PLAYLISTS,
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
