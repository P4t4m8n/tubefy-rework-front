import { IPlaylist } from "../models/playlist.model";
import { ISong, ISongYT } from "../models/song.model";
import { youTubePlayer } from "../services/player.service";
import { setIsPlaying, setPlayingSong } from "../store/actions/player.action";
import { setCurrentPlaylist } from "../store/actions/playlist.action";
import { useAppSelector } from "./useStore";

export const usePlay = () => {
  const { playingSong, isPlaying, player, volume } = useAppSelector(
    (state) => state.player
  );
  const { currentPlaylist } = useAppSelector((state) => state.playlists);

  const onPlaylistPlay = (playlist: IPlaylist) => {
    if (playlist.id !== currentPlaylist?.id) {
      setCurrentPlaylist(playlist);
      setPlayingSong(playlist.songs[0]);
    }

    togglePlayPause();
    return;
  };

  const onSongPlay = (song: ISong | ISongYT) => {
    if (playingSong?.youtubeId !== song.youtubeId) setPlayingSong(song);

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
    player,
    volume,
    currentPlaylist,
    onPlaylistPlay,
    onSongPlay,
    togglePlayPause,
  };
};
