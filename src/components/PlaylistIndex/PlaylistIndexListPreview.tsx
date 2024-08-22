import { Link } from "react-router-dom";
import { IPlaylist } from "../../models/playlist.model";
import PlayBtn from "../Buttons/PlayBtn";
import { setImgForBackground } from "../../store/actions/imgGradient.action";

interface Props {
  playlist: IPlaylist;
}
export default function PlaylistIndexListPreview({ playlist }: Props) {
  const { imgUrl, name, description, id, songs } = playlist;

  const defaultImgUrl = "/defaultImg.svg";

  const handleError = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    ev.currentTarget.src = defaultImgUrl;
    ev.currentTarget.onerror = null;
  };
  return (
    <li
      onMouseEnter={() => setImgForBackground(imgUrl)}
      onMouseLeave={() => setImgForBackground("")}
      className="playlist-list-preview"
    >
      <Link to={`/playlist/${id}`}>
        <img onError={handleError} src={imgUrl} alt={name} />

        <div className="playlist-list-preview-info">
          <h3>{name}</h3>
          <p>{description || songs[0]?.artist || "!!!"}</p>
        </div>
        <PlayBtn item={playlist} />
      </Link>
    </li>
  );
}
