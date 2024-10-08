import { memo, MouseEvent } from "react";
import { usePlay } from "../../hooks/usePlay";
import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { PlayingAnimationSVG, PlaySVG } from "../svg/SVGs";
import { isSong } from "../../util/player.util";
import { utilService } from "../../util/util.util";

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

  const itemType = item.itemType;
  const onPlay = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (itemType === "PLAYLIST" && (item as IPlaylist).songs.length === 0) {
      utilService.handleError(
        "Playlist is empty",
        "GENERAL_ERROR",
        new Error("No songs in playlist")
      );
      return;
    }
    if (itemType === "PLAYLIST") {
      onPlaylistPlay(item as IPlaylist);
      return;
    }
    onSongPlay(item as ISong | ISongYT);
  };
  const showSongPlay =
    isSong(item) && playingSong?.youtubeId === item.youtubeId;
  const showPlaylistPlay = "id" in item && item.id === currentPlaylist?.id;
  const buttonClass =
    isPlaying && (showSongPlay || showPlaylistPlay) ? "playing" : "";

  return (
    <button onClick={onPlay} className={`play-btn ${buttonClass}`}>
      {isPlaying && (showSongPlay || showPlaylistPlay) ? (
        <PlayingAnimationSVG />
      ) : (
        <PlaySVG />
      )}
    </button>
  );
}

export default memo(PlayBtn);
