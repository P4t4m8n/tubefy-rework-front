import { IPlaylist } from "../../models/playlist.model";
import PlaylistIndexListPreview from "./PlaylistIndexListPreview";

interface Props {
  playlists: IPlaylist[];
}
export default function PlaylistIndexList({ playlists }: Props) {
  return (
    <>
      <ul>
        {playlists.map((playlist) => (
          <PlaylistIndexListPreview key={playlist.id} playlist={playlist} />
        ))}
      </ul>
    </>
  );
}
