import { IPlaylist } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { HeartSVG } from "../svg/SVGs";

interface Props {
  item: ISongYT | ISong | IPlaylist|null;
}

export function LikeBtn({  item }: Props) {
  const onLike = () => {};

  const btnClass = `like-btn ${item?.isLikedByUser ? "liked" : ""}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
