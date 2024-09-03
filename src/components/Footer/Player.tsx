import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import PlayerVolumeControl from "./PlayerVolumeControl";
import PlayerPlayingCard from "./PlayerPlayingCard";

export default function Player() {
  return (
    <footer className="app-footer">
      <PlayerPlayingCard />
      <YouTubeAudioPlayer />
      <PlayerVolumeControl />
    </footer>
  );
}
