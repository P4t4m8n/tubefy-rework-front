import { Link } from "react-router-dom";

import { IPlaylist, IPlaylistDetailed } from "../../../models/playlist.model";
import { NoteSVG } from "../../svg/SVGs";
import PlayBtn from "../../Buttons/PlayBtn";
import UserLibraryListItemModel from "./UserLibraryListItemModel";

interface Props {
  playlist: IPlaylist | IPlaylistDetailed;
  isHighlighted: boolean;
}

export default function UserLibraryListItem({
  playlist,
  isHighlighted,
}: Props) {
  const itemClass = `user-playlist-item ${isHighlighted ? "highlight" : ""}`;
  const { id, imgUrl, name, songs } = playlist;

  return (
    <li key={id} className={itemClass}>
      <Link to={`/playlist/${id}`}>
        <PlayBtn item={playlist} />
        <div className="img-con">
          {imgUrl ? <img src={imgUrl} alt={name} /> : <NoteSVG />}
        </div>
        <span>{playlist.name}</span>
        <p>{songs.length} songs</p>
      </Link>
      <UserLibraryListItemModel playlistId={id!} />
    </li>
  );
}
