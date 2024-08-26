import {
  IPlaylistState,
  TPlaylistActionTypes,
  SET_MAIN_PLAYLISTS,
  SET_USER_PLAYLISTS,
  SET_LIKED_PLAYLIST,
  SET_PLAYLISTS_BULK,
} from "../../models/playlist.model";
import { getSessionData } from "../../services/localSession.service";

const initialState: IPlaylistState = {
  mainPlaylists: [],
  userPlaylists: getSessionData("playlists") || [],
  likedPlaylist: getSessionData("likedPlaylist"),
};

export const playlistReducer = (
  state = initialState,
  action: TPlaylistActionTypes
): IPlaylistState => {
  switch (action.type) {
    case SET_MAIN_PLAYLISTS:
      return { ...state, mainPlaylists: action.payload };
    case SET_USER_PLAYLISTS:
      return { ...state, userPlaylists: action.payload };
    case SET_LIKED_PLAYLIST:
      return { ...state, likedPlaylist: action.payload };
    case SET_PLAYLISTS_BULK:
      return {
        ...state,
        userPlaylists: action.payload.userPlaylists,
        likedPlaylist: action.payload.likedPlaylist,
      };
    default:
      return state;
  }
};
