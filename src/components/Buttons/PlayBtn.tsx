import { memo, MouseEvent } from "react";
import { usePlay } from "../../hooks/usePlay";
import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { PauseSVG, PlaySVG } from "../svg/SVGs";
import { isSong } from "../../util/player.util";

interface Props {
  item: ISong | IPlaylist | ISongYT;
}

function PlayBtn({ item }: Props) {
  const {
    onPlaylistPlay,
    onSongPlay,
    isPlaying,
    playingSong,
    currentPlaylist,
  } = usePlay();

  const onPlay = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if ("songs" in item) {
      onPlaylistPlay(item);
    } else {
      onSongPlay(item);
    }
  };

  const showSongPlay =
    isSong(item) && playingSong?.youtubeId === item.youtubeId;
  const showPlaylistPlay = "id" in item && item.id === currentPlaylist?.id;
  const buttonClass =
    isPlaying && (showSongPlay || showPlaylistPlay) ? "playing" : "";

  return (
    <button onClick={onPlay} className={`play-btn ${buttonClass}`}>
      {isPlaying && (showSongPlay || showPlaylistPlay) ? (
        <PauseSVG />
      ) : (
        <PlaySVG />
      )}
    </button>
  );
}

export default memo(PlayBtn);
