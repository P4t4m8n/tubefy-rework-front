import { IPlaylistObject } from "../../models/playlist.model";
import PlaylistIndexListPreview from "./PlaylistIndexListPreview";

interface Props {
  PlaylistObject: IPlaylistObject;
}
export default function PlaylistIndexList({ PlaylistObject }: Props) {
  return (
    <li className="playlist-list">
      <h2>{PlaylistObject.type}</h2>
      <ul>
        {PlaylistObject.playlists.map((playlist) => (
          <PlaylistIndexListPreview key={playlist.id} playlist={playlist} />
        ))}
      </ul>
    </li>
  );
}
