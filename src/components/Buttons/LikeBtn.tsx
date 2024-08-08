import { useEffect, useState } from "react";
import { IPlaylistDetailed } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { isYTSong } from "../../util/app.util";
import { HeartSVG } from "../svg/SVGs";
import { playlistService } from "../../services/playlist.service";
import { songService } from "../../services/song.service";

interface Props {
  item: ISongYT | ISong | IPlaylistDetailed;
}

export function LikeBtn({ item }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [animation, setAnimation] = useState<
    "" | "like-animation" | "un-like-animation"
  >("");
  const isYTSongCheck = isYTSong(item);

  useEffect(() => {
    if (item && !isYTSongCheck) {
      setIsLiked((item as ISong | IPlaylistDetailed).isLikedByUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onLike = async () => {
    let finishCheck = false;
    //optimistic update
    setIsLiked(!isLiked);
    setAnimation(isLiked ? "un-like-animation" : "like-animation");
    try {
      if (!isYTSongCheck) {
        if ("songs" in item) {
          finishCheck = await playlistService.togglePlaylistLIke(item.id);
        } else {
          finishCheck = await songService.toggleSongLike((item as ISong).id);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!finishCheck) {
        setIsLiked(!isLiked);
      }
    }
  };
  const btnClass = `like-btn ${isLiked ? "liked" : ""} ${animation}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
