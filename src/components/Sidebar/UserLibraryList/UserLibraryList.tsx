import { Link, useLocation } from "react-router-dom";
import {
  ILikedSongPlaylist,
  IPlaylistDetailed,
} from "../../../models/playlist.model";
import { NoteSVG } from "../../svg/SVGs";
import { getCurrentPlaylist } from "../../../store/getStore";
import PlayBtn from "../../Buttons/PlayBtn";
import UserLibraryListPreview from "./UserLibraryListPreview";

interface Props {
  userLikedSongsPlaylist: ILikedSongPlaylist;
  playlists: IPlaylistDetailed[];
}
export default function UserLibraryList({
  userLikedSongsPlaylist,
  playlists,
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
          currentPlaylistId === userLikedSongsPlaylist?.id ||
          playlistId === userLikedSongsPlaylist?.id
            ? "highlight"
            : ""
        }`}
      >
        <Link to={`/playlist/${userLikedSongsPlaylist.id}?isLiked=true`}>
          <PlayBtn item={userLikedSongsPlaylist!} />
          <div className="img-con">
            {userLikedSongsPlaylist?.imgUrl ? (
              <img src={userLikedSongsPlaylist!.imgUrl} alt="Liked songs" />
            ) : (
              <NoteSVG />
            )}
          </div>
          <span>Liked songs</span>
          <p>{userLikedSongsPlaylist!.songs.length} songs</p>
        </Link>
      </li>
      {playlists.map((playlist) => (
        <UserLibraryListPreview
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
