import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlist.service";
import { IPlaylistDetailed } from "../models/playlist.model";
import { LikeBtn } from "../components/Buttons/LikeBtn";
import { getUserState } from "../store/getStore";
import { transformUserPlaylistsStateForModel } from "../util/playlist.util";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import { removeSongFromPlaylist } from "../store/actions/playlist.action";
import Loader from "../components/Loader";
import { setImgForBackground } from "../store/actions/imgGradient.action";
import { showUserMsg } from "../services/eventEmitter";

export default function PlaylistDetails() {
  const [playlist, setPlaylist] = useState<IPlaylistDetailed | null>(null);

  const params = useParams<{ id: string }>();
  const userId = getUserState()?.id;

  useEffect(() => {
    const loadPlaylist = async (id: string) => {
      try {
        const playlist = await playlistService.get(id);
        setPlaylist(playlist);
        setImgForBackground(playlist.imgUrl);
      } catch (error) {
        showUserMsg({
          text: "Failed to load playlist",
          type: "general-error",
          status: "error",
        });
      }
    };

    if (params.id) loadPlaylist(params.id);
  }, [params.id]);

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

  const { name, imgUrl, owner, songs, duration, id } = playlist;
  const playlistModelData = transformUserPlaylistsStateForModel(id);

  const heroProps = {
    imgUrl,
    name,
    description: "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songs: songs.length,
    duration,
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
