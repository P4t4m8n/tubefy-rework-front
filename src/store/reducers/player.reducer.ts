// reducer.ts
import {
  PlayerActionTypes,
  SET_PLAYING_SONG,
  SET_VOLUME,
  SET_IS_PLAYING,
  SET_PLAYER,
  IPlayerState,
} from "../../models/player.model";

const initialState: IPlayerState = {
  playingSong: null,
  volume: 50,
  isPlaying: false,
  player: null,
};

export const playerReducer = (
  state = initialState,
  action: PlayerActionTypes
): IPlayerState => {
  switch (action.type) {
    case SET_PLAYING_SONG:
      return { ...state, playingSong: action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    default:
      return state;
  }
};
