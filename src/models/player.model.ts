import { YouTubeEvent } from "react-youtube";
import { ISong, ISongYT } from "./song.model";

export const SET_PLAYING_SONG = "SET_PLAYING_SONG";
export const SET_VOLUME = "SET_VOLUME";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_PLAYER = "SET_PLAYER";

export interface IPlayerState {
  playingSong: ISong | null | ISongYT;
  volume: number;
  isPlaying: boolean;
  player: YouTubeEvent | null;
}

export type TPlayerActionType =
  | typeof SET_PLAYING_SONG
  | typeof SET_VOLUME
  | typeof SET_IS_PLAYING
  | typeof SET_PLAYER;

export interface ISetPlayingSongAction {
  type: typeof SET_PLAYING_SONG;
  payload: ISong | ISongYT;
}

export interface ISetVolumeAction {
  type: typeof SET_VOLUME;
  payload: number;
}

export interface ISetIsPlayingAction {
  type: typeof SET_IS_PLAYING;
  payload: boolean;
}

export interface ISetPlayerAction {
  type: typeof SET_PLAYER;
  payload: YouTubeEvent;
}

export interface IYouTubePlayer {
  volume: number;
  pauseVideo: () => void;
  playVideo: () => void;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  seekTo: (time: number) => void;
}

export type PlayerActionTypes =
  | ISetPlayingSongAction
  | ISetVolumeAction
  | ISetIsPlayingAction
  | ISetPlayerAction;
