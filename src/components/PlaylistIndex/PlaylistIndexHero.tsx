import { IPlaylist } from "../../models/playlist.model";
import { getGreeting } from "../../util/user.util";
import PlayBtn from "../Buttons/PlayBtn";

interface Props {
  heroPlaylists: IPlaylist[];
}
export default function PlaylistIndexHero({ heroPlaylists }: Props) {
  const greeting = getGreeting();
  return (
    <div className="playlist-index-hero">
      <h1>{greeting}</h1>
      <ul>
        {heroPlaylists.map((playlist) => (
          <li key={playlist.id} className="playlist-index-hero-item">
            <img src={playlist.imgUrl} alt={playlist.name} />
            <h2>{playlist.name}</h2>
            <PlayBtn song={playlist.songs[0]} />
          </li>
        ))}
      </ul>
    </div>
  );
}
