import {
  IPlaylistState,
  TPlaylistActionTypes,
  SET_MAIN_PLAYLISTS,
  SET_USER_PLAYLISTS,
} from "../../models/playlist.model";

const initialState: IPlaylistState = {
  mainPlaylists: [],
  userPlaylists: [],
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

    default:
      return state;
  }
};
