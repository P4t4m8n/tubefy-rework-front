import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { playlistService } from "../services/playlist.service";
import { Loader } from "../components/Loader";
import { IPlaylistDetailed } from "../models/playlist.model";
import { LikeBtn } from "../components/Buttons/LikeBtn";
import { getUser } from "../store/getStore";
import { transformUserPlaylistsForModel } from "../util/playlist.util";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import { removeSongFromPlaylist } from "../store/actions/playlist.action";

export default function PlaylistDetails() {
  const [playlist, setPlaylist] = useState<IPlaylistDetailed | null>(null);

  const params = useParams<{ id: string }>();
  const location = useLocation();

  const isLiked =
    new URLSearchParams(location.search).get("isLiked") === "true";

  const userId = getUser()?.id;

  useEffect(() => {
    const loadPlaylist = async (id: string) => {
      try {
        const playlist = isLiked
          ? await playlistService.getUserLikedSongsPlaylistById(id)
          : await playlistService.get(id);
        setPlaylist(playlist);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.id) loadPlaylist(params.id);
  }, [params.id, isLiked]);

  const onRemoveSongFromPlaylist = useCallback(
    async (songId: string) => {
      if (!playlist || !userId || !playlist.id) return;
      await removeSongFromPlaylist(playlist.id, songId, userId);
      setPlaylist((prev) => {
        if (!prev) return prev;
        const updatedSongs = prev.songs.filter((song) => song.id !== songId);
        return { ...prev, songs: updatedSongs };
      });
    },
    [playlist, userId]
  );

  if (!playlist) return <Loader />;

  const { name, imgUrl, owner, songs, duration, shares, id } = playlist;
  const playlistModelData = transformUserPlaylistsForModel(id);

  const heroProps = {
    imgUrl,
    name,
    description: "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songs: songs.length,
    duration,
    shares: shares.count,
  };

  const isOwner = owner.id === userId;

  return (
    <section className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className="playlist-details-actions">
        <PlayBtn item={playlist} />
        <LikeBtn item={playlist} />
      </div>
      <PlaylistSongsList
        isOwner={isOwner}
        songs={songs}
        playlistModelData={playlistModelData}
        onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
      />
    </section>
  );
}
