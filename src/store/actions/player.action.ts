import { ISong, ISongYT } from "../../models/song.model";
import {
  SET_PLAYING_SONG,
  SET_IS_PLAYING,
  ISetPlayingSongAction,
  ISetIsPlayingAction,
  ISetCurrentPlaylistAction,
  SET_CURRENT_PLAYLIST,
} from "../../models/player.model";
import { store } from "../store";
import { IPlaylist } from "../../models/playlist.model";

export const setPlayingSong = (
  song: ISong | ISongYT
): ISetPlayingSongAction => ({
  type: SET_PLAYING_SONG,
  payload: song,
});

export const setCurrentPlaylist = (
  playlist: IPlaylist 
): ISetCurrentPlaylistAction => ({
  type: SET_CURRENT_PLAYLIST,
  payload: playlist,
});

export const toggleIsPlaying = (isPlaying: boolean): ISetIsPlayingAction => ({
  type: SET_IS_PLAYING,
  payload: isPlaying,
});

export const setIsPlaying = (isPlaying: boolean) => {
  store.dispatch(toggleIsPlaying(isPlaying));
};

export const loadSong = (song: ISong | ISongYT) => {
  console.log("song:", song);
  store.dispatch(setPlayingSong(song));
};

export const loadCurrentPlaylist = (
  playlist: IPlaylist 
) => {
  store.dispatch(setCurrentPlaylist(playlist));
};
