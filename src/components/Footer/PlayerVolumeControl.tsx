import { ChangeEvent } from "react";
import { setVolume } from "../../store/actions/player.action";
import { useAppSelector } from "../../hooks/useStore";
import { FullScreenSVG, VolumeSVG } from "../svg/SVGs";

export function PlayerVolumeControl() {
  const { volume, player } = useAppSelector((state) => state.player);

  const handleVolumeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(ev.target.value, 10);
    setVolume(newVolume);
    if (player) {
      player.target.setVolume(newVolume);
    }
  };

  const onSetVolume = () => {
    let vol = 100;
    if (volume > 0) vol = 0;
    setVolume(vol);
    if (player) {
      player.target.setVolume(vol);
    }
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
    <section className="footer-right">
      <button onClick={onSetVolume}>
        <VolumeSVG />
      </button>
      <div className="volume">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        ></input>
      </div>
      <button onClick={toggleFullScreen}>
        <FullScreenSVG />
      </button>
    </section>
  );
}
