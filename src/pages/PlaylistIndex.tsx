import { useMemo, useState } from "react";
import { loadDefaultPlaylists } from "../store/actions/playlist.action";
import { extractHeroPlaylists } from "../util/playlist.util";
import { IPlaylistsGroup } from "../models/playlist.model";
import PlaylistIndexList from "../components/PlaylistIndex/PlaylistIndexList";
import PlaylistIndexHero from "../components/PlaylistIndex/PlaylistIndexHero";
import Loader from "../components/Loader";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { utilService } from "../util/util.util";

export default function PlaylistIndex() {
  const [mainPlaylists, setMainPlaylists] = useState<IPlaylistsGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffectUpdate(() => {
    const handleLoading = async () => {
      try {
        setIsLoading(true);
        const playlists = await loadDefaultPlaylists();
        setMainPlaylists(playlists);
      } catch (error) {
        utilService.handleError(
          "playlist-index",
          "GENERAL_ERROR",
          error as Error
        );
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
