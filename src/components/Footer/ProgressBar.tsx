import { MouseEvent, useEffect, useRef, useState } from "react";
import { formatTime } from "../../util/player.util";
import { ISong } from "../../models/song.model";
import { YouTubeEvent } from "react-youtube";

interface Props {
  song: ISong | null;
  player: YouTubeEvent | null;
}

export function ProgressBar({ song, player }: Props) {
  const [progress, setProgress] = useState<{
    progressPercentage: number;
    timeElapsed: string;
    time: string;
  } | null>(null);

  const intervalId = useRef<string | number | NodeJS.Timeout>("");

  useEffect(() => {
    const updateProgress = () => {
      const progressObj = makeTime(player);
      setProgress({ ...progressObj });
    };

    if (player) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(updateProgress, 237);
    }
  }, [player, song]);

  function handleProgressbar(ev: MouseEvent<HTMLDivElement>) {
    const progressBar = ev.target as HTMLDivElement;

    const clickPosition =
      (ev.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    const newTime = clickPosition * player!.target.getDuration();

    player!.target.seekTo(newTime);
    // setProgress(clickPosition);
  }

  const makeTime = (
    player: YouTubeEvent | null
  ): {
    progressPercentage: number;
    timeElapsed: string;
    time: string;
  } => {
    if (
      !player ||
      !player.target.getCurrentTime ||
      !player.target.getDuration
    ) {
      return {
        progressPercentage: 0,
        timeElapsed: "0:00",
        time: "0:00",
      };
    }

    const currentTime = player.target.getCurrentTime();
    const duration = player.target.getDuration();
    const progressPercentage = (currentTime / duration) * 100;
    const timeElapsed = formatTime(currentTime);
    const time = formatTime(duration);
    return { progressPercentage, timeElapsed, time };
  };

  return (
    <div className="progress-bar">
      <p style={{ color: "white" }}>
        {progress ? progress.timeElapsed : "0:00"}{" "}
      </p>
      <div
        onClick={handleProgressbar}
        className="bar"
        style={{ width: "100%", height: "4px", backgroundColor: "gray" }}
      >
        <div
          className="bar-mov"
          style={{
            height: "100%",
            width: `${progress ? progress.progressPercentage : 0}%`,
            backgroundColor: "white",
          }}
        />
      </div>
      <p className="text-left" style={{ color: "white" }}>
        {progress ? progress.time : "0:00"}{" "}
      </p>
    </div>
  );
}
