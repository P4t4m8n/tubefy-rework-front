import { Link } from "react-router-dom";
import { IPlaylist } from "../../models/playlist.model";
import PlayBtn from "../Buttons/PlayBtn";

interface Props {
  playlist: IPlaylist;
}
export default function SearchIndexPlaylistItem({ playlist }: Props) {
  const { imgUrl, name, duration } = playlist;
  return (
    <li className="search-playlist-list">
      <Link to={`/playlist/${playlist.id}`}>
        <img src={imgUrl} />
        <h3>{name}</h3>
        <p>{duration}</p>
        <PlayBtn item={playlist} />
      </Link>
    </li>
  );
}
