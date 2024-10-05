import { MouseEvent, useRef, useState } from "react";
import { FullScreenSVG, VolumeSVG } from "../svg/SVGs";
import { youTubePlayer } from "../../services/player.service";

export default function PlayerVolumeControl() {
  const [volume, setVolume] = useState(50);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (ev: MouseEvent) => {
    if (!volumeBarRef?.current) return;

    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickPosition = ev.clientX - rect.left;
    const newVolume = Math.max(
      0,
      Math.min(100, (clickPosition / rect.width) * 100)
    ); // Calculate new volume based on click
    if (youTubePlayer.isPlayerReady()) youTubePlayer.setVolume(newVolume);
    setVolume(newVolume);
  };

  const handleDrag = (ev: MouseEvent) => {
    if (ev.buttons !== 1) return; // Check if mouse is held down
    handleVolumeChange(ev);
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
      <div
        className="volume-bar"
        ref={volumeBarRef}
        onClick={handleVolumeChange}
        onMouseMove={handleDrag}
      >
        <div className="volume-fill" style={{ width: `${volume}%` }} />
        <div className="volume-handle" style={{ left: `${volume}%` }} />
      </div>

      <button onClick={toggleFullScreen}>
        <FullScreenSVG />
      </button>
    </section>
  );
}
