import { IPlaylist } from "../../models/playlist.model";
import { getGreeting } from "../../util/user.util";

import BackgroundGradient from "../BackgroundGradient";
import PlaylistIndexList from "../PlaylistIndex/PlaylistIndexList";

interface Props {
  heroPlaylists: IPlaylist[];
}
export default function HomeHero({ heroPlaylists }: Props) {
  const greeting = getGreeting();

  return (
    <section className="home-hero">
      <BackgroundGradient />
      <h2>{greeting}</h2>
      <PlaylistIndexList playlists={heroPlaylists} />
    </section>
  );
}
