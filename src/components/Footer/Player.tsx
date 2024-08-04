import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer";
import { PlayerVolumeControl } from "./PlayerVolumeControl";
import { PlayerPlayingCard } from "./PlayerPlayingCard";

export function Player() {
  return (
    <footer className="app-footer">
      <PlayerPlayingCard />
      <YouTubeAudioPlayer />
      <PlayerVolumeControl />
    </footer>
  );
}
