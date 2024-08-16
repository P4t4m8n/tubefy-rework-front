import { ILikedSongPlaylist, IPlaylist } from "../../models/playlist.model";
import PlayBtn from "../Buttons/PlayBtn";
import { PinSVG } from "../svg/SVGs";

interface Props {
  playlists: Array<IPlaylist | ILikedSongPlaylist>;
}

export default function UserLibraryList({ playlists }: Props) {
  return (
    <ul className="user-playlist-list">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <PlayBtn item={playlist} />
          <img src={playlist.imgUrl} alt={playlist.name} />
          <span>{playlist.name}</span>
          <PinSVG />
        </li>
      ))}
    </ul>
  );
}
