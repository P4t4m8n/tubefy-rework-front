import { MouseEvent, useRef, useState } from "react";
import { formatTime } from "../../util/player.util";
import { ISong, ISongYT } from "../../models/song.model";
import { youTubePlayer } from "../../services/player.service";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";

interface Props {
  song: ISong | null | ISongYT;
}

export function ProgressBar({ song }: Props) {
  const [progress, setProgress] = useState<{
    progressPercentage: number;
    timeElapsed: string;
    time: string;
  } | null>(null);

  const intervalId = useRef<string | number | NodeJS.Timeout>("");

  useEffectUpdate(() => {
    const updateProgress = () => {
      const progressObj = makeTime();
      setProgress({ ...progressObj });
    };

    if (youTubePlayer.isPlayerReady()) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(updateProgress, 237);
    }
  }, [song]);

  const handleProgressbar = (ev: MouseEvent<HTMLDivElement>) => {
    const progressBar = ev.target as HTMLDivElement;

    const clickPosition =
      (ev.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    const newTime = clickPosition * youTubePlayer.getDuration();

    youTubePlayer.seekTo(newTime);
  };

  const makeTime = (): {
    progressPercentage: number;
    timeElapsed: string;
    time: string;
  } => {
    if (!youTubePlayer||!youTubePlayer.getCurrentTime||!youTubePlayer.getDuration) {
      return {
        progressPercentage: 0,
        timeElapsed: "0:00",
        time: "0:00",
      };
    }

    const currentTime = youTubePlayer.getCurrentTime();
    const duration = youTubePlayer.getDuration();
    const progressPercentage = (currentTime / duration) * 100;
    const timeElapsed = formatTime(currentTime);
    const time = formatTime(duration);
    return { progressPercentage, timeElapsed, time };
  };

  return (
    <div className="progress-bar">
      <p>{progress ? progress.timeElapsed : "0:00"} </p>
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
      <p>{progress ? progress.time : "0:00"} </p>
    </div>
  );
}
