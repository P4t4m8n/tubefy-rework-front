import { ChangeEvent, useState } from "react";
import { FullScreenSVG, VolumeSVG } from "../svg/SVGs";
import { youTubePlayer } from "../../services/player.service";

export default function PlayerVolumeControl() {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(ev.target.value, 10);
    if (youTubePlayer.isPlayerReady()) youTubePlayer.setVolume(newVolume);
    setVolume(newVolume);
  };

  const onSetVolume = () => {
    if (!youTubePlayer.isPlayerReady()) return;
    let vol = 100;
    const volume = youTubePlayer.getVolume();
    if (volume > 0) vol = 0;
    youTubePlayer.setVolume(vol);
    setVolume(vol);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <section className="volume-control">
      <button
        className={`${volume === 0 ? "no-vol" : ""} volume-btn`}
        onClick={onSetVolume}
      >
        <VolumeSVG />
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      ></input>

      <button onClick={toggleFullScreen}>
        <FullScreenSVG />
      </button>
    </section>
  );
}
