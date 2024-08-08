import { useAppSelector } from "../../hooks/useStore";
import { LikeBtn } from "../Buttons/LikeBtn";

export function PlayerPlayingCard() {
  const { playingSong } = useAppSelector((state) => state.player);

  return (
    <div className="playing-card">
      <img src={playingSong?.thumbnail} alt={playingSong?.name}></img>
      <div className="playing-card-info">
        <h3>{playingSong?.name}</h3>
        <h4>{playingSong?.artist}</h4>
      </div>
      <LikeBtn item={playingSong} />
    </div>
  );
}
