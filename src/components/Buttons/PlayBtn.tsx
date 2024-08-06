import { MouseEvent } from "react";
import { usePlay } from "../../hooks/usePlay";
import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { PlaySVG } from "../svg/SVGs";

interface Props {
  item: ISong | IPlaylist | ISongYT;
}
export default function PlayBtn({ item }: Props) {
  const { onPlaylistPlay, onSongPlay } = usePlay();

  const onPlay = (ev: MouseEvent) => {
    ev.stopPropagation();
    if ("songs" in item) {
      onPlaylistPlay(item);
    } else {
      onSongPlay(item);
    }
  };
  return (
    <button onClick={onPlay} className="play-btn">
      <PlaySVG />
    </button>
  );
}
