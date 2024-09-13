import { useRef } from "react";

import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { useModel } from "../../hooks/useModel";
import { usePlay } from "../../hooks/usePlay";

import { BackwardsSVG, NextSVG, PauseSVG, PlaySVG } from "../svg/SVGs";

import PlayerUI from "./PlayerUI";
import ProgressBar from "./ProgressBar";
import { useGradient } from "../../hooks/useGradient";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { setImgForBackground } from "../../store/actions/imgGradient.action";

export default function YoutubeAudioPlayerMobile() {
  const { playingSong, isPlaying, currentPlaylist, togglePlayPause } =
    usePlay();

  const { onEnd, onReady, onChangeOrder, onChangeSong, songOrderMode } =
    useAudioPlayer(playingSong, currentPlaylist);
  const modelRef = useRef<HTMLDivElement>(null);
  const gradient = useGradient();
  console.log("gradient:", gradient);

  useEffectUpdate(() => {
    if (currentPlaylist?.imgUrl) {
      setImgForBackground(currentPlaylist.imgUrl);
    }
  }, [playingSong]);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  const { youtubeId } = playingSong;

  return (
    <>
      <section
        style={{
          background: `${gradient ? gradient : ""}`,
        }}
        ref={modelRef}
        className="player-mobile"
      >
        <ProgressBar song={playingSong} />
        <button
          className="player-mobile-model-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            setIsModelOpen(true);
          }}
        >
          <img
            src={
              playingSong.imgUrl ||
              currentPlaylist?.imgUrl ||
              "default-song.png"
            }
            alt="song-img"
          />
          <h3>{playingSong?.name || "No song loaded"}</h3>
          <h4>{playingSong?.artist || "No song loaded"}</h4>
        </button>
        <div className="player-control">
          <button onClick={togglePlayPause} className="play-button ">
            {isPlaying ? <PauseSVG /> : <PlaySVG />}
          </button>
          <button className="dir" onClick={() => onChangeSong(1)}>
            <NextSVG />
          </button>
        </div>
        <div className={`player-mobile-model ${isModelOpen ? "open" : ""}`}>
          <header>
            <button
              className="close-model-btn"
              onClick={() => setIsModelOpen(false)}
            >
              <BackwardsSVG />
            </button>
          </header>
          <img
            src={
              playingSong.imgUrl ||
              currentPlaylist?.imgUrl ||
              "default-song.png"
            }
            alt="song-img"
          />
          <span className="song-info">
            <h3>{playingSong?.name || "No song loaded"}</h3>
            <h4>{playingSong?.artist || "No song loaded"}</h4>
          </span>
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
        </div>
      </section>
    </>
  );
}
