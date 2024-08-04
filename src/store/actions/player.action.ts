// actionCreators.ts
import { ISong } from "../../models/song.model";
import { YouTubeEvent } from "react-youtube";
import {
  SET_PLAYING_SONG,
  SET_VOLUME,
  SET_IS_PLAYING,
  SET_PLAYER,
  ISetPlayingSongAction,
  ISetVolumeAction,
  ISetIsPlayingAction,
  ISetPlayerAction,
} from "../../models/player.model";

export const setPlayingSong = (song: ISong): ISetPlayingSongAction => ({
  type: SET_PLAYING_SONG,
  payload: song,
});

export const setVolume = (volume: number): ISetVolumeAction => ({
  type: SET_VOLUME,
  payload: volume,
});

export const setIsPlaying = (isPlaying: boolean): ISetIsPlayingAction => ({
  type: SET_IS_PLAYING,
  payload: isPlaying,
});

export const setPlayer = (player: YouTubeEvent): ISetPlayerAction => ({
  type: SET_PLAYER,
  payload: player,
});
