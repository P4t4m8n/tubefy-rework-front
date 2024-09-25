import { useNavigate, useParams } from "react-router-dom";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { utilService } from "../util/util.util";
import { getSessionData } from "../services/localSession.service";
import {
  IPlaylist,
  IPlaylistsGroup,
  TPlaylistType,
} from "../models/playlist.model";
import { loadDefaultPlaylists } from "../store/actions/playlist.action";
import { playlistService } from "../services/playlist.service";
import { useState } from "react";
import Loader from "../components/Loader";
import PlaylistIndexList from "../components/PlaylistIndex/PlaylistIndexList";

export default function PlaylistsIndex() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { type } = useParams();
  const navigate = useNavigate();

  useEffectUpdate(() => {
    if (!type) {
      utilService.handleError(
        "Playlist not found",
        "GENERAL_ERROR",
        new Error("Playlist not found")
      );
      navigate("/");
    }

    const getPlaylist = async () => {
      try {
        let playlistsGroup: IPlaylistsGroup[] | null = [];
        playlistsGroup = getSessionData("defaultPlaylists");
        if (!playlistsGroup) playlistsGroup = await loadDefaultPlaylists();

        const playlistGroup = playlistsGroup.find((p) => p.type === type);
        let playlists = playlistGroup?.playlists;
        if (!playlists)
          playlists = await playlistService.query({
            types: [type as TPlaylistType],
          });
        setPlaylists(playlists);
      } catch (error) {
        utilService.handleError(
          "Failed to load playlist",
          "GENERAL_ERROR",
          error as Error
        );
        setPlaylists([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPlaylist();
  }, [type]);

  if (isLoading) return <Loader />;
  return (
    <section className="playlists-index">
      <h2>{type}</h2>
      <PlaylistIndexList playlists={playlists} />
    </section>
  );
}
