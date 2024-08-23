import { Link } from "react-router-dom";

import { IPlaylist, IPlaylistDetailed } from "../../../models/playlist.model";
import { NoteSVG } from "../../svg/SVGs";
import PlayBtn from "../../Buttons/PlayBtn";
import UserLibraryListPreviewModel from "./UserLibraryListPreviewModel";

interface Props {
  playlist: IPlaylist | IPlaylistDetailed;
  isHighlighted: boolean;
}

export default function UserLibraryListPreview({
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
      {/*TODO Model won't close when click a different button, still no solution /*/}
      <UserLibraryListPreviewModel playlistId={id!} />
    </li>
  );
}
