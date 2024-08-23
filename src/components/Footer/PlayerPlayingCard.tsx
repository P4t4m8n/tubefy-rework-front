import { useAppSelector } from "../../hooks/useStore";
import { LikeBtn } from "../Buttons/LikeBtn";

export function PlayerPlayingCard() {
  const playingSong = useAppSelector((state) => state.player.playingSong);

  const { imgUrl, name, artist } = playingSong;

  return (
    <div className="playing-card">
      <img src={imgUrl} alt={name}></img>
      <div className="playing-card-info">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
      <LikeBtn item={playingSong} />
    </div>
  );
}
