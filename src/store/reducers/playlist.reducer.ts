import {
  IPlaylistState,
  PlaylistActionTypes,
  TPlaylistActionType,
  SET_MAIN_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  IPlaylistObject,
  IPlaylist,
} from "../../models/playlist.model";

const initialState: IPlaylistState = {
  mainPlaylists: [],
  currentPlaylist: null,
};

const playlistsActions: Record<TPlaylistActionType, TPlaylistActionType> = {
  SET_MAIN_PLAYLISTS: SET_MAIN_PLAYLISTS,
  SET_CURRENT_PLAYLIST: SET_CURRENT_PLAYLIST,
} as const;

export const playlistReducer = (
  state = initialState,
  action: PlaylistActionTypes
): IPlaylistState => {
  switch (action.type) {
    case playlistsActions.SET_MAIN_PLAYLISTS:
      return { ...state, mainPlaylists: action.payload as IPlaylistObject[] };
    case playlistsActions.SET_CURRENT_PLAYLIST:
      return { ...state, currentPlaylist: action.payload as IPlaylist };
    default:
      return state;
  }
};
