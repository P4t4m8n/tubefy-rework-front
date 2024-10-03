import { IPlaylistDetailed } from "../models/playlist.model";
import { store } from "./store";

export const getUserPlaylistsState = (): IPlaylistDetailed[] => {
  return store.getState().playlists.userPlaylists || [];
};

export const getUserLikedPlaylist = () => {
  return store.getState().playlists.likedPlaylist;
};

export const getUserState = () => {
  return store.getState().user.user;
};

export const getCurrentPlaylist = () => {
  return store.getState().player.currentPlaylist;
};

export const getFriendsState = () => {
  return store.getState().friends.friends;
};

export const getCurrentGradient = () => {
  return store.getState().imgGradient.gradient;
};
