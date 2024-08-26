import { Link, useLocation } from "react-router-dom";
import { IPlaylistDetailed } from "../../../models/playlist.model";
import { NoteSVG } from "../../svg/SVGs";
import { getCurrentPlaylist } from "../../../store/getStore";
import PlayBtn from "../../Buttons/PlayBtn";
import UserLibraryListPreview from "./UserLibraryListPreview";

interface Props {
  likedPlaylist: IPlaylistDetailed;
  playlists: IPlaylistDetailed[];
  onSharePlaylist: (playlistId: string, friendId: string) => void;
}
export default function UserLibraryList({
  likedPlaylist,
  playlists,
  onSharePlaylist,
}: Props) {
  const currentPlaylistId = getCurrentPlaylist()?.id;
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const playlistId = segments.pop() || null;

  return (
    <ul className="user-playlist-list">
      <li
        className={`user-playlist-item ${
          currentPlaylistId === likedPlaylist?.id ||
          playlistId === likedPlaylist?.id
            ? "highlight"
            : ""
        }`}
      >
        <Link to={`/playlist/${likedPlaylist.id}`}>
          <PlayBtn item={likedPlaylist!} />
          <div className="img-con">
            {likedPlaylist?.imgUrl ? (
              <img src={likedPlaylist!.imgUrl} alt="Liked songs" />
            ) : (
              <NoteSVG />
            )}
          </div>
          <span>Liked songs</span>
          <p>{likedPlaylist!.songs.length} songs</p>
        </Link>
      </li>
      {playlists.map((playlist) => (
        <UserLibraryListPreview
          onSharePlaylist={onSharePlaylist}
          playlist={playlist}
          key={playlist.id}
          isHighlighted={
            currentPlaylistId === playlist?.id || playlistId === playlist?.id
          }
        />
      ))}
    </ul>
  );
}
