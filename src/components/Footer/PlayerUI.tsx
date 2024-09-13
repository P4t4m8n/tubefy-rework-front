import YouTube, { YouTubeEvent } from "react-youtube";
import { ISong, ISongYT } from "../../models/song.model";
import {
  NextSVG,
  PauseSVG,
  PlaySVG,
  PrevSVG,
  RepeatSVG,
  ShuffleSVG,
} from "../svg/SVGs";
import ProgressBar from "./ProgressBar";

interface Props {
  playingSong: ISong | ISongYT;
  isPlaying: boolean;
  youtubeId: string;
  songOrderMode: "shuffle" | "repeat" | "normal";

  togglePlayPause: () => void;
  onChangeSong: (direction: number) => void;
  onEnd: () => void;
  onReady: (ev: YouTubeEvent) => void;
  onChangeOrder: (mode: "shuffle" | "repeat") => void;
}

export default function PlayerUI({
  playingSong,
  isPlaying,
  youtubeId,
  songOrderMode,
  togglePlayPause,
  onChangeSong,
  onEnd,
  onReady,
  onChangeOrder,
}: Props) {
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
    },
  };
  return (
    <section className="player">
      <div className="player-control">
        <button
          className={`${songOrderMode === "shuffle" ? "highlight" : ""}`}
          onClick={() => onChangeOrder("shuffle")}
        >
          <ShuffleSVG />
        </button>
        <button className="dir" onClick={() => onChangeSong(-1)}>
          <PrevSVG />
        </button>
        <button onClick={togglePlayPause} className="play-button ">
          {isPlaying ? <PauseSVG /> : <PlaySVG />}
        </button>
        <button className="dir" onClick={() => onChangeSong(1)}>
          <NextSVG />
        </button>
        <button
          className={`repeat ${songOrderMode === "repeat" ? "highlight" : ""}`}
          onClick={() => onChangeOrder("repeat")}
        >
          <RepeatSVG />
        </button>
      </div>
      <ProgressBar song={playingSong} />
      <YouTube
        className="video"
        videoId={youtubeId}
        opts={opts}
        onEnd={onEnd}
        onReady={onReady}
      />
    </section>
  );
}
