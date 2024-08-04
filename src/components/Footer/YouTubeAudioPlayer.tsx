import { useEffect, useRef } from "react";
import { setPlayer, setPlayingSong } from "../../store/actions/player.action";
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
import { ProgressBar } from "./ProgressBar";

export function YouTubeAudioPlayer() {
  const {
    playingSong,
    isPlaying,
    player,
    volume,
    currentPlaylist,
    togglePlayPause,
  } = usePlay();

  const stationIdx = useRef(0);
  const isRepeat = useRef(false);
  const isShuffle = useRef(false);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
    },
  };

  useEffect(() => {
    if (!playingSong && currentPlaylist)
      setPlayingSong(currentPlaylist.songs[0]);
  }, [playingSong, currentPlaylist]);

  const onEnd = (ev: YouTubeEvent) => {

    if (!isRepeat.current && !isShuffle.current) {
      stationIdx.current++;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
    }

    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length
      );
    }
    setPlayingSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onShuffle = () => {
    isRepeat.current = false;
    isShuffle.current = !isShuffle.current;
  };

  const onRepeat = () => {
    isShuffle.current = false;
    isRepeat.current = !isRepeat.current;
  };

  const onChangeSong = (dir: number) => {
    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length
      );
    } else if (isRepeat.current) {
    } else {
      stationIdx.current += dir;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
      if (stationIdx.current < 0)
        stationIdx.current = currentPlaylist!.songs.length - 1;
    }

    setPlayingSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onReady = (ev: YouTubeEvent) => {
    setPlayer(ev.target);
    ev.target.setVolume(volume);
  };

  if (!playingSong) return;

  const { youtubeId } = playingSong;

  return (
    <section className="player">
      <div className="player-control">
        <button className="shuffle" onClick={onShuffle}>
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
        <button className="repeat" onClick={onRepeat}>
          <RepeatSVG></RepeatSVG>
        </button>
      </div>
      <ProgressBar song={playingSong} player={player} />
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
