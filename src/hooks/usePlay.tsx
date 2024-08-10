import { IPlaylist } from "../models/playlist.model";
import { ISong, ISongYT } from "../models/song.model";
import { youTubePlayer } from "../services/player.service";
import {
  loadCurrentPlaylist,
  loadSong,
  setIsPlaying,
} from "../store/actions/player.action";
import { useAppSelector } from "./useStore";

export const usePlay = () => {
  const { playingSong, isPlaying, currentPlaylist } = useAppSelector(
    (state) => state.player
  );

  const onPlaylistPlay = (playlist: IPlaylist) => {
    if (playlist.id !== currentPlaylist?.id) {
      loadCurrentPlaylist(playlist);
      loadSong(playlist.songs[0]);
      youTubePlayer.playVideo();
      setIsPlaying(true);
    } else {
      togglePlayPause();
    }
    return;
  };

  const onSongPlay = (song: ISong | ISongYT) => {
   
    if (playingSong?.youtubeId !== song.youtubeId) loadSong(song);

    togglePlayPause();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      youTubePlayer.pauseVideo();
      setIsPlaying(false);
    } else {
      youTubePlayer.playVideo();
      setIsPlaying(true);
    }
  };

  return {
    playingSong,
    isPlaying,
    currentPlaylist,
    onPlaylistPlay,
    onSongPlay,
    togglePlayPause,
  };
};
