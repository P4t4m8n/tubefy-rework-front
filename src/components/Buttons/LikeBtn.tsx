import { memo, useState } from "react";
import { IPlaylistDetailed } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import { HeartSVG } from "../svg/SVGs";
import { useLike } from "../../hooks/useLike";

interface Props {
  item: ISongYT | ISong | IPlaylistDetailed;
}

function LikeBtn({ item }: Props) {
  const { isLiked, toggleLike } = useLike(item);
  const [animation, setAnimation] = useState<
    "" | "like-animation" | "un-like-animation"
  >("");

  const onLike = () => {
    toggleLike();
    setAnimation(isLiked ? "un-like-animation" : "like-animation");
  };
  const btnClass = `like-btn ${isLiked ? "liked" : ""} ${animation}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
export default memo(LikeBtn);
