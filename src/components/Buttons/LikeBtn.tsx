import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { HeartSVG } from "../svg/SVGs";

interface Props {
  item: ISongYT | ISong | IPlaylist;
}

export function LikeBtn({ isLiked, item }: Props) {
  const onLike = () => {};

  const btnClass = `like-btn ${isLiked ? "liked" : ""}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
