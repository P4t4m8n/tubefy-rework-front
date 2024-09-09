import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import PlayBtn from "../../Buttons/PlayBtn";
import { NoteSVG } from "../../svg/SVGs";

interface Props {
  currentPlaylistId?: string | null;
  focusedPlaylistId?: string | null;
}
export default function UserLibraryLikedSongs({
  currentPlaylistId,
  focusedPlaylistId,
}: Props) {
  const likedPlaylist = useAppSelector(
    (state) => state.playlists.likedPlaylist
  );
  return (
    <li
      key={likedPlaylist?.id}
      className={`user-playlist-item ${
        currentPlaylistId === likedPlaylist?.id ||
        focusedPlaylistId === likedPlaylist?.id
          ? "highlight"
          : ""
      }`}
    >
      <Link to={`/playlist/${likedPlaylist!.id}`}>
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
  );
}
