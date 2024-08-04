import { Link } from "react-router-dom";
import { IPlaylist } from "../../models/playlist.model";

interface Props {
  playlist: IPlaylist;
}
export default function PlaylistIndexListPreview({ playlist }: Props) {
  const { imgUrl, name, description, id, songs } = playlist;
  console.log("songs:", songs);

  const defaultImgUrl = "/defaultImg.svg";

  const handleError = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    ev.currentTarget.src = defaultImgUrl;
    ev.currentTarget.onerror = null;
  };
  return (
    <li className="playlist-list-preview">
      <Link to={`/playlist/${id}`}>
        <img
          onError={handleError}
          src={
            "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebafa254b2a224584485286526/5/en-GB/default"
          }
          alt={name}
        />

        <div className="playlist-list-preview-info">
          <h3>{name}</h3>
          <p>{description || songs[0]?.artist || "!!!"}</p>
        </div>
      </Link>
    </li>
  );
}
