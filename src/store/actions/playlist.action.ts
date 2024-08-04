import {
  IPlaylist,
  IPlaylistObject,
  ISetMainPlaylistsAction,
  ISetCurrentPlaylistAction,
  SET_MAIN_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
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

export const setCurrentPlaylist = (
  playlist: IPlaylist
): ISetCurrentPlaylistAction => ({
  type: SET_CURRENT_PLAYLIST,
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

export const savePlaylist = async (
  playlist: IPlaylist
): Promise<IPlaylist | null> => {
  try {
    const playlistDTO = playlistService.playlistToPlayListDTO(playlist);
    const savedPlaylist = await playlistService.save(playlistDTO);
    if (savedPlaylist) {
      store.dispatch(setCurrentPlaylist(savedPlaylist));
    }
    return savedPlaylist;
  } catch (error) {
    console.error(`Error while saving playlist: ${error}`);
    return null;
  }
};
