import { usePlay } from "../../hooks/usePlay";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

import PlayerUI from "./PlayerUI";

export default function YouTubeAudioPlayer() {
  const { playingSong, isPlaying, currentPlaylist, togglePlayPause } =
    usePlay();

  const { onEnd, onReady, onChangeOrder, onChangeSong, songOrderMode } =
    useAudioPlayer(playingSong, currentPlaylist);

  if (!playingSong) return;

  const { youtubeId } = playingSong;

  return (
    <PlayerUI
      playingSong={playingSong}
      isPlaying={isPlaying}
      youtubeId={youtubeId}
      songOrderMode={songOrderMode}
      togglePlayPause={togglePlayPause}
      onChangeSong={onChangeSong}
      onEnd={onEnd}
      onReady={onReady}
      onChangeOrder={onChangeOrder}
    />
  );
}
