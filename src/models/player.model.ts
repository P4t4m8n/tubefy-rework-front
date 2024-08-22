import { ISong, ISongYT } from "./song.model";
import { ILikedSongPlaylist, IPlaylist } from "./playlist.model";

export const SET_PLAYING_SONG = "SET_PLAYING_SONG";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST";
export interface IPlayerState {
  playingSong: ISong | ISongYT;
  isPlaying: boolean;
  currentPlaylist: IPlaylist | null | ILikedSongPlaylist;
}
export interface ISetPlayingSongAction {
  type: typeof SET_PLAYING_SONG;
  payload: ISong | ISongYT;
}
export interface ISetCurrentPlaylistAction {
  type: typeof SET_CURRENT_PLAYLIST;
  payload: IPlaylist | ILikedSongPlaylist | null;
}
export interface ISetIsPlayingAction {
  type: typeof SET_IS_PLAYING;
  payload: boolean;
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

export type TPlayerActionTypes =
  | ISetPlayingSongAction
  | ISetIsPlayingAction
  | ISetCurrentPlaylistAction;
