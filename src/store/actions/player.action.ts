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
import { utilService } from "../../util/util.util";

export const setIsPlaying = (isPlaying: boolean) => {
  try {
    store.dispatch(toggleIsPlaying(isPlaying));
  } catch (error) {
    utilService.handleError("Unable to play", "GENERAL_ERROR", error as Error);
  }
};

export const loadSong = (song: ISong | ISongYT) => {
  try {
    store.dispatch(setPlayingSong(song));
    utilService.handleSuccess(
      `Playing ${song.name}`,
      "GENERAL_NOTIFICATION",
      song.imgUrl
    );
  } catch (error) {
    utilService.handleError("Unable to play", "GENERAL_ERROR", error as Error);
  }
};

export const loadCurrentPlaylist = (playlist: IPlaylist) => {
  try {
    store.dispatch(setCurrentPlaylist(playlist));
    utilService.handleSuccess(
      `Playing ${playlist.name}`,
      "GENERAL_NOTIFICATION",
      playlist.imgUrl
    );
  } catch (error) {
    utilService.handleError("Unable to play", "GENERAL_ERROR", error as Error);
  }
};

const setPlayingSong = (song: ISong | ISongYT): ISetPlayingSongAction => ({
  type: SET_PLAYING_SONG,
  payload: song,
});

const setCurrentPlaylist = (
  playlist: IPlaylist
): ISetCurrentPlaylistAction => ({
  type: SET_CURRENT_PLAYLIST,
  payload: playlist,
});

const toggleIsPlaying = (isPlaying: boolean): ISetIsPlayingAction => ({
  type: SET_IS_PLAYING,
  payload: isPlaying,
});
