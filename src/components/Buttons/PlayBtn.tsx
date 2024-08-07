import { MouseEvent } from "react";
import { usePlay } from "../../hooks/usePlay";
import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { PauseSVG, PlaySVG } from "../svg/SVGs";
import { useAppSelector } from "../../hooks/useStore";

interface Props {
  item: ISong | IPlaylist | ISongYT;
}

// Type guard to check if item is ISong or ISongYT
function isSong(item: ISong | IPlaylist | ISongYT): item is ISong | ISongYT {
  return (item as ISong).youtubeId !== undefined;
}

export default function PlayBtn({ item }: Props) {
  const { onPlaylistPlay, onSongPlay, isPlaying, playingSong } = usePlay();
  const { currentPlaylist } = useAppSelector((state) => state.playlists);

  const onPlay = (ev: MouseEvent) => {
    ev.stopPropagation();
    if ("songs" in item) {
      onPlaylistPlay(item);
    } else {
      onSongPlay(item);
    }
  };

  const buttonClass =
    isPlaying &&
    ((isSong(item) && playingSong?.youtubeId === item.youtubeId) ||
      ("id" in item && item.id === currentPlaylist?.id))
      ? "playing"
      : "";

  return (
    <button onClick={onPlay} className={`play-btn ${buttonClass}`}>
      {isPlaying ? <PauseSVG /> : <PlaySVG />}
    </button>
  );
}
