import {
  TPlayerActionTypes,
  SET_PLAYING_SONG,
  SET_IS_PLAYING,
  IPlayerState,
  SET_CURRENT_PLAYLIST,
} from "../../models/player.model";
import { getDefaultSong } from "../../util/song.util";

const initialState: IPlayerState = {
  playingSong: getDefaultSong(),
  isPlaying: false,
  currentPlaylist: null,
};

export const playerReducer = (
  state = initialState,
  action: TPlayerActionTypes
): IPlayerState => {
  switch (action.type) {
    case SET_PLAYING_SONG:
      return { ...state, playingSong: action.payload };
    case SET_CURRENT_PLAYLIST:
      return { ...state, currentPlaylist: action.payload };
    case SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload };

    default:
      return state;
  }
};
