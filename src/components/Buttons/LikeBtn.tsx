import { HeartSVG } from "../svg/SVGs";

interface Props {
  isLiked: boolean;
  itemId: string|null;
}

export function LikeBtn({ isLiked, itemId }: Props) {

  const onLike = () => {};

  const btnClass = `like-btn ${isLiked ? "liked" : ""}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
