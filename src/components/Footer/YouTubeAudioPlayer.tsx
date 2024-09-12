import { useRef, useState } from "react";
import { loadSong } from "../../store/actions/player.action";
import YouTube, { YouTubeEvent } from "react-youtube";
import { utilService } from "../../util/util.util";
import {
  NextSVG,
  PauseSVG,
  PlaySVG,
  PrevSVG,
  RepeatSVG,
  ShuffleSVG,
} from "../svg/SVGs";
import { usePlay } from "../../hooks/usePlay";
import ProgressBar from "./ProgressBar";
import { youTubePlayer } from "../../services/player.service";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";

export default function YouTubeAudioPlayer() {
  const { playingSong, isPlaying, currentPlaylist, togglePlayPause } =
    usePlay();
  console.log("currentPlaylist:", currentPlaylist);

  const [songOrderMode, setSongOrderMode] = useState<
    "shuffle" | "repeat" | "normal"
  >("normal");
  const stationIdx = useRef(0);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
    },
  };

  useEffectUpdate(() => {
    if (!playingSong && currentPlaylist) loadSong(currentPlaylist.songs[0]);
  }, [playingSong, currentPlaylist]);

  const onEnd = () => {
    if (songOrderMode === "shuffle") {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length - 1
      );
    }

    if (songOrderMode === "normal") {
      stationIdx.current++;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
    }

    loadSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onChangeOrder = (order: "shuffle" | "repeat") => {
    setSongOrderMode((prev) => (prev === order ? "normal" : order));
  };

  const onChangeSong = (dir: number) => {
    if (songOrderMode === "shuffle") {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length - 1
      );
    } else if (songOrderMode === "normal") {
      stationIdx.current += dir;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
      if (stationIdx.current < 0)
        stationIdx.current = currentPlaylist!.songs.length - 1;
    }

    loadSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onReady = (ev: YouTubeEvent) => {
    const vol = youTubePlayer.volume || 0;
    youTubePlayer.setPlayer(ev.target);
    youTubePlayer.setVolume(vol);
  };

  if (!playingSong) return;

  const { youtubeId } = playingSong;

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
          <NextSVG></NextSVG>
        </button>
        <button
          className={`repeat ${songOrderMode === "repeat" ? "highlight" : ""}`}
          onClick={() => onChangeOrder("repeat")}
        >
          <RepeatSVG></RepeatSVG>
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
