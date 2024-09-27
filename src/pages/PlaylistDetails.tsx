import { RefObject, useRef } from "react";

import { usePlaylistEdit } from "../hooks/usePlaylistEdit";
import { useAppSelector } from "../hooks/useStore";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

import { TModelSize } from "../models/app.model";
import { ISong } from "../models/song.model";

import { isAllowedToEditPlaylist } from "../util/playlist.util";
import {
  REGULAR_SONG_MENU_SIZE,
  WITH_REMOVE_SONG_MENU_SIZE,
} from "../util/constants.util";

import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import Loader from "../components/Loader";
import PlaylistMenu from "../components/Menus/PlaylistMenu/PlaylistMenu";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import LikeBtn from "../components/Buttons/LikeBtn";
import { redirect } from "react-router-dom";

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
  console.log("isActive:", isActive)
  

  if (isLoading) return <Loader />;
  if (!playlist) return redirect("/");

  const { name, imgUrl, owner, songs, duration, id, description } = playlist;

  const heroProps = {
    imgUrl,
    name,
    description: description || "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songs: songs.length,
    duration,
  };

  const isAllowedToEdit = isAllowedToEditPlaylist(id, user?.id);

  const playlistSongsProps: {
    songs: ISong[];
    isOwner: boolean;
    container: RefObject<HTMLDivElement | HTMLUListElement>;
    onRemoveSongFromPlaylist?: (songId: string) => void;
    isActive?: boolean;
    isLoggedIn?: boolean;
    modelSize: TModelSize;
  } = {
    songs,
    isOwner: isAllowedToEdit,
    container: detailsRef,
    isActive,
    modelSize: REGULAR_SONG_MENU_SIZE,
  };

  if (isAllowedToEdit) {
    playlistSongsProps.onRemoveSongFromPlaylist = onRemoveSongFromPlaylist;
    playlistSongsProps.modelSize = WITH_REMOVE_SONG_MENU_SIZE;
  }

  if (user) {
    playlistSongsProps.isLoggedIn = true;
  }

  return (
    <section ref={detailsRef} className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
        <div className="actions-sentinel" ref={sentinelRef}></div>
      <div className={`playlist-details-actions ${isActive && "stick"}`}>
        <PlayBtn item={playlist!} />
        <LikeBtn item={playlist!} />
        {user && isAllowedToEdit && (
          <PlaylistMenu
            playlistId={playlist!.id}
            container={detailsRef}
            modelSize={{ width: 208, height: 30 * 3 + 24 }}
          />
        )}
      </div>
      <PlaylistSongsList {...playlistSongsProps} />
    </section>
  );
}
