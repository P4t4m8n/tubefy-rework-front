import { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/hooks";
import { loadDefaultPlaylists } from "../store/actions/playlist.action";
import { extractHeroPlaylists } from "../util/playlist.util";
import PlaylistIndexHero from "../components/PlaylistIndex/PlaylistIndexHero";

export default function PlaylistIndex(): ReactNode {
  const mainPlaylists = useAppSelector(
    (state) => state.playlists.mainPlaylists
  );

  useEffect(() => {
    loadDefaultPlaylists();
  }, []);
  const heroPlaylists = useMemo(() => {
    return extractHeroPlaylists(mainPlaylists);
  }, [mainPlaylists]);
  return (
    <section className="playlist-index">
      <PlaylistIndexHero heroPlaylists={heroPlaylists} />
    </section>
  );
}
