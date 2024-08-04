import { HeartSVG } from "../svg/SVGs";

interface Props {
  isLiked: boolean;
  itemId: string|null;
}

export function LikeBtn({ isLiked, itemId }: Props) {
  console.log("itemId:", itemId);

  const onLike = () => {};

  const btnClass = `like-btn ${isLiked ? "liked" : ""}`;

  return (
    <button className={btnClass} onClick={onLike}>
      <HeartSVG />
    </button>
  );
}
