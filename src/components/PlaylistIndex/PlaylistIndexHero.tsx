import { IPlaylist } from "../../models/playlist.model";
import { getGreeting } from "../../util/user.util";
import BackgroundGradient from "../BackgroundGradient";
import PlaylistIndexList from "./PlaylistIndexList";

interface Props {
  heroPlaylists: IPlaylist[];
}
export default function PlaylistIndexHero({ heroPlaylists }: Props) {
  const greeting = getGreeting();
  const playlistObject = { type: greeting, playlists: heroPlaylists };

  return (
    <section className="playlist-index-hero">
      <BackgroundGradient/>
      <PlaylistIndexList PlaylistObject={playlistObject} />
    </section>
  );
}
