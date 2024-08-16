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
import { ILikedSongPlaylist, IPlaylist } from "../../models/playlist.model";

export const setPlayingSong = (
  song: ISong | ISongYT
): ISetPlayingSongAction => ({
  type: SET_PLAYING_SONG,
  payload: song,
});

export const setCurrentPlaylist = (
  playlist: IPlaylist | ILikedSongPlaylist
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
  store.dispatch(setPlayingSong(song));
};

export const loadCurrentPlaylist = (
  playlist: IPlaylist | ILikedSongPlaylist
) => {
  store.dispatch(setCurrentPlaylist(playlist));
};
