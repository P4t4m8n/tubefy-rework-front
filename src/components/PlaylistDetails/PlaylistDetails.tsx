import { useRef } from "react";

import { usePlaylistEdit } from "../../hooks/usePlaylistEdit";
import { useAppSelector } from "../../hooks/useStore";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import {
  getPlaylistSongsProps,
  isAllowedToEditPlaylist,
} from "../../util/playlist.util";

import PlaylistDetailsHero from "./PlaylistDetailsHero";
import PlayBtn from "../Buttons/PlayBtn";
import Loader from "../Loader";
import PlaylistMenu from "../Menus/PlaylistMenu/PlaylistMenu";
import PlaylistSongsList from "../PlaylistSongList/PlaylistSongsList";
import LikeBtn from "../Buttons/LikeBtn";
import { WITH_REMOVE_SONG_MENU_SIZE } from "../../util/constants.util";

export default function PlaylistDetails() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector((state) => state.user.user);

  const {
    playlistToEdit: playlist,
    isLoading,
    onRemoveSongFromPlaylist,
  } = usePlaylistEdit(user?.id);

  const isActive = useIntersectionObserver(sentinelRef, isLoading);

  if (isLoading) return <Loader />;
  if (!playlist) return 

  const { name, imgUrl, owner, songs, duration, id, description } = playlist;

  const heroProps = {
    imgUrl,
    name,
    description: description || "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songsLength: songs.length,
    duration,
  };

  const isAllowedToEdit = isAllowedToEditPlaylist(id, user?.id);

  const playlistSongsProps = getPlaylistSongsProps(
    songs,
    isAllowedToEdit,
    detailsRef,
    isActive,
    !!user,
    onRemoveSongFromPlaylist
  );

  return (
    <section ref={detailsRef} className="playlist-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className="actions-sentinel" ref={sentinelRef}></div>
      <div className={`playlist-details-actions ${isActive && "stick"}`}>
        <PlayBtn item={playlist!} />
        <LikeBtn item={playlist!} />
        {user && isAllowedToEdit && (
          <PlaylistMenu
            playlistId={playlist!.id}
            container={detailsRef}
            modelSize={WITH_REMOVE_SONG_MENU_SIZE}
          />
        )}
      </div>
      <PlaylistSongsList {...playlistSongsProps} />
    </section>
  );
}
