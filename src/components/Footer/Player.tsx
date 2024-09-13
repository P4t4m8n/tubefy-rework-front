import YouTubeAudioPlayer from "./YouTubeAudioPlayer";
import PlayerVolumeControl from "./PlayerVolumeControl";
import PlayerPlayingCard from "./PlayerPlayingCard";

import { useScreenSizeListener } from "../../hooks/useScreenSizeListener";
import YoutubeAudioPlayerMobile from "./YoutubeAudioPlayerMobile";

export default function Player() {
  const { isMobile } = useScreenSizeListener();

  return (
    <>
      {isMobile ? (
        <footer className="app-footer-mobile">
          <YoutubeAudioPlayerMobile />
        </footer>
      ) : (
        <footer className="app-footer">
          <PlayerPlayingCard />
          <YouTubeAudioPlayer />
          <PlayerVolumeControl />
        </footer>
      )}
    </>
  );
}
