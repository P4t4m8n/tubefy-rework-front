import { useMemo, useState } from "react";

import { loadDefaultPlaylists } from "../../store/actions/playlist.action";
import { extractHeroPlaylists } from "../../util/playlist.util";
import { IPlaylistsGroup } from "../../models/playlist.model";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { utilService } from "../../util/util.util";

import PlaylistIndexList from "./PlaylistIndexList";
import PlaylistIndexHero from "./PlaylistIndexHero";
import Loader from "../Loader";
import { Link } from "react-router-dom";

export default function Home() {
  const [mainPlaylists, setMainPlaylists] = useState<IPlaylistsGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffectUpdate(() => {
    const handleLoading = async () => {
      try {
        const playlists = await loadDefaultPlaylists();
        setMainPlaylists(playlists);
      } catch (error) {
        utilService.handleError("home", "GENERAL_ERROR", error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    handleLoading();
  }, []);

  const heroPlaylists = useMemo(() => {
    return extractHeroPlaylists(mainPlaylists);
  }, [mainPlaylists]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="home">
      <PlaylistIndexHero heroPlaylists={heroPlaylists} />
      <ul className="home-list">
        {mainPlaylists.map((playlistObject) => (
          <li key={playlistObject.type} className="playlist-list">
            <div className="playlist-list-header">
              <h2>{playlistObject.type}</h2>
              <Link to={`/playlists/${playlistObject.type}`}>View All</Link>
            </div>
            <PlaylistIndexList playlists={playlistObject.playlists} />
          </li>
        ))}
      </ul>
    </section>
  );
}
