import { LikeBtn } from "../components/Buttons/LikeBtn";
import { isAllowedToEditPlaylist } from "../util/playlist.util";
import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import Loader from "../components/Loader";
import { usePlaylistEdit } from "../hooks/usePlaylistEdit";
import { useAppSelector } from "../hooks/useStore";
import { redirect } from "react-router-dom";
import { RefObject, useRef, useState } from "react";
import PlaylistMenu from "../components/Menus/PlaylistMenu/PlaylistMenu";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { utilService } from "../util/util.util";
import { ISong } from "../models/song.model";

export default function PlaylistDetails() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const {
    playlistToEdit: playlist,
    isLoading,
    onRemoveSongFromPlaylist,
  } = usePlaylistEdit(user?.id);

  useEffectUpdate(() => {
    const sentinel = sentinelRef.current;
    console.log("sentinel:", sentinel);

    if (sentinel) {
      const observer = new IntersectionObserver(
        utilService.throttle((entries) => {
          setIsActive(!entries[0].isIntersecting);
        }, 100),
        {
          threshold: [0.1],
          rootMargin: "-1px 0px 0px 0px",
        }
      );

      observer.observe(sentinel);

      return () => {
        observer.unobserve(sentinel);
        observer.disconnect();
      };
    }
  }, [playlist]);

  if (isLoading) return <Loader />;
  if (!playlist) return redirect("/");

  const { name, imgUrl, owner, songs, duration, id } = playlist!;

  const heroProps = {
    imgUrl,
    name,
    description: "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songs: songs.length,
    duration,
  };

  const isAllowedToEdit = isAllowedToEditPlaylist(id, user?.id);
  console.log("isAllowedToEdit:", isAllowedToEdit);
  const playlistSongsProps: {
    songs: ISong[];
    isOwner: boolean;
    container: RefObject<HTMLDivElement | HTMLUListElement>;
    onRemoveSongFromPlaylist?: (songId: string) => void;
    isActive?: boolean;
    isLoggedIn?: boolean;
  } = {
    songs,
    isOwner: isAllowedToEdit,
    container: detailsRef,
    isActive,
  };
  if (isAllowedToEdit) {
    playlistSongsProps.onRemoveSongFromPlaylist = onRemoveSongFromPlaylist;
  }

  if (user) {
    playlistSongsProps.isLoggedIn = true;
  }

  return (
    <section ref={detailsRef} className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className={`playlist-details-actions ${isActive && "stick"}`}>
        <PlayBtn item={playlist} />
        <LikeBtn item={playlist} />
        {user && isAllowedToEdit && (
          <PlaylistMenu
            playlistId={playlist.id}
            container={detailsRef}
            modelSize={{ width: 208, height: 30 * 3 + 24 }}
          />
        )}
      </div>
      <PlaylistSongsList {...playlistSongsProps} />
      <div className="actions-sentinel" ref={sentinelRef}></div>
    </section>
  );
}
