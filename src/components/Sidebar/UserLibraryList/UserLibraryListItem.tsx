import { Link } from "react-router-dom";

import { IPlaylist, IPlaylistDetailed } from "../../../models/playlist.model";
import { NoteSVG } from "../../svg/SVGs";
import PlayBtn from "../../Buttons/PlayBtn";
import PlaylistMenu from "../../Menus/PlaylistMenu/PlaylistMenu";
import { RefObject } from "react";

interface Props {
  playlist: IPlaylist | IPlaylistDetailed;
  isHighlighted: boolean;
  container: RefObject<HTMLUListElement>;
}

export default function UserLibraryListItem({
  playlist,
  isHighlighted,
  container,
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
      <PlaylistMenu
        playlistId={id}
        container={container}
        modelSize={{ width: 208, height: 30 * 3 + 24 }}
      />
    </li>
  );
}
