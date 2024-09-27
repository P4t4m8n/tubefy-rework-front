import { Link } from "react-router-dom";

import { IPlaylist } from "../../models/playlist.model";
import { setImgForBackground } from "../../store/actions/imgGradient.action";

import PlayBtn from "../Buttons/PlayBtn";

interface Props {
  playlist: IPlaylist;
}
export default function PlaylistIndexListPreview({ playlist }: Props) {
  const { imgUrl, name, description, id, songs } = playlist;

  const fallbackDescription = songs
    .slice(0, 3)
    .map((song) => song.artist)
    .join(", ");

  return (
    <li
      onMouseEnter={() => setImgForBackground(imgUrl)}
      className="playlist-list-preview"
    >
      <Link to={`/playlist/${id}`}>
        <img src={imgUrl} alt={"/default-playlist.png"} />
        <div className="playlist-list-preview-info">
          <h3>{name}</h3>
          <p>{description || fallbackDescription}</p>
        </div>
        <PlayBtn item={playlist} />
      </Link>
    </li>
  );
}
