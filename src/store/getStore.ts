import { store } from "./store";

export const getUserPlaylistsState = () => {
  return store.getState().playlists.userPlaylists;
};

export const getUser = () => {
  return store.getState().user.user;
};
