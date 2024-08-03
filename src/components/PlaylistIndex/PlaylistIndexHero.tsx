import { IPlaylist } from "../../models/playlist.model";
import { getGreeting } from "../../util/user.util";
import PlaylistIndexList from "./PlaylistIndexList";

interface Props {
  heroPlaylists: IPlaylist[];
}
export default function PlaylistIndexHero({ heroPlaylists }: Props) {
  const greeting = getGreeting();
  const playlistObject = { type: greeting, playlists: heroPlaylists };

  return (
    <section className="playlist-index-hero">
      <h1>{greeting}</h1>
      <PlaylistIndexList PlaylistObject={playlistObject} />
    </section>
  );
}
