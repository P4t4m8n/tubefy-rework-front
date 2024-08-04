import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/useStore";
import { loadDefaultPlaylists } from "../store/actions/playlist.action";
import { extractHeroPlaylists } from "../util/playlist.util";
import PlaylistIndexHero from "../components/PlaylistIndex/PlaylistIndexHero";
import { Loader } from "../components/Loader";
import PlaylistIndexList from "../components/PlaylistIndex/PlaylistIndexList";

export default function PlaylistIndex(): ReactNode {
  const mainPlaylists = useAppSelector(
    (state) => state.playlists.mainPlaylists
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoading();
  }, []);

  const handleLoading = async () => {
    try {
      setIsLoading(true);
      await loadDefaultPlaylists();
    } catch (error) {
      console.error(`Error while loading default playlists: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  const heroPlaylists = useMemo(() => {
    return extractHeroPlaylists(mainPlaylists);
  }, [mainPlaylists]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="playlist-index">
      <PlaylistIndexHero heroPlaylists={heroPlaylists} />
      <ul className="playlist-index-list">
        {mainPlaylists.map((playlistObject) => (
          <li key={playlistObject.type} className="playlist-list">
            <PlaylistIndexList PlaylistObject={playlistObject} />
          </li>
        ))}
      </ul>
    </section>
  );
}
