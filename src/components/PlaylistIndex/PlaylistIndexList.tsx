import { IPlaylistsGroup } from "../../models/playlist.model";
import PlaylistIndexListPreview from "./PlaylistIndexListPreview";

interface Props {
  PlaylistObject: IPlaylistsGroup;
}
export default function PlaylistIndexList({ PlaylistObject }: Props) {
  return (
    <>
      <h2>{PlaylistObject.type}</h2>
      <ul>
        {PlaylistObject.playlists.map((playlist) => (
          <PlaylistIndexListPreview key={playlist.id} playlist={playlist} />
        ))}
      </ul>
    </>
  );
}
