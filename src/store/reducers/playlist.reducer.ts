import { IPlaylistAction, IPlaylistState } from "../../models/playlist.model";

const initialState: IPlaylistState = {
  mainPlaylists: [],
  currentPlaylist: null,
};

export const playlistReducer = (
  state = initialState,
  action: IPlaylistAction
): IPlaylistState => {
  switch (action.type) {
    case "SET_MAIN_PLAYLISTS":
      if (Array.isArray(action.payload)) {
        return { ...state, mainPlaylists: action.payload };
      } else {
        console.error(
          "SET_MAIN_PLAYLISTS action payload should be an array of playlists"
        );
        return state;
      }
    case "SET_CURRENT_PLAYLIST":
      if (
        typeof action.payload === "object" &&
        !Array.isArray(action.payload)
      ) {
        return { ...state, currentPlaylist: action.payload };
      } else {
        console.error(
          "SET_CURRENT_PLAYLIST action payload should be a playlist object"
        );
        return state;
      }
    default:
      return state;
  }
};
