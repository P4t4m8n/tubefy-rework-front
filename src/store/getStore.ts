import { IPlaylistDetailed } from "../models/playlist.model";
import { store } from "./store";

export const getUserPlaylistsState = (): IPlaylistDetailed[] => {
  return store.getState().playlists.userPlaylists || [];
};

export const getUserState = () => {
  return store.getState().user.user;
};

export const getCurrentPlaylist = () => {
  return store.getState().player.currentPlaylist;
};

