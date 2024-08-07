import {
  IPlaylistState,
  TPlaylistActionTypes,
  SET_MAIN_PLAYLISTS,
} from "../../models/playlist.model";

const initialState: IPlaylistState = {
  mainPlaylists: [],
};

export const playlistReducer = (
  state = initialState,
  action: TPlaylistActionTypes
): IPlaylistState => {
  switch (action.type) {
    case SET_MAIN_PLAYLISTS:
      return { ...state, mainPlaylists: action.payload };
    default:
      return state;
  }
};
