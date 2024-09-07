import { IUserSmall } from "../models/user.model";
import { usePlaylistEdit } from "../hooks/usePlaylistEdit";
import { useRef } from "react";
import Loader from "../components/Loader";
import PlaylistEditHero from "../components/PlaylistEdit/PlaylistEditHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import PlaylistEditSearch from "../components/PlaylistEdit/PlaylistEditSearch";
import PlaylistMenu from "../components/Menus/PlaylistMenu/PlaylistMenu";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface Props {
  user?: IUserSmall;
}
export default function PlaylistEdit({ user }: Props) {
  const {
    playlistToEdit,
    onUploadImg,
    onUpdatePlaylist,
    isLoading,
    onRemoveSongFromPlaylist,
    addSongToPlaylistEdit,
  } = usePlaylistEdit(user?.id);

  const container = useRef<HTMLDivElement | HTMLUListElement>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const isActive = useIntersectionObserver(sentinelRef, isLoading);

  if (!playlistToEdit) return <Loader />;
  const { id } = playlistToEdit;

  const heroProps = {
    imgUrl: playlistToEdit.imgUrl,
    onUploadImg,
    onSaveHero: onUpdatePlaylist,
    infoData: {
      name: playlistToEdit?.name || "",
      description: playlistToEdit?.description || "",
      username: playlistToEdit?.owner.username || "",
      avatarUrl: playlistToEdit?.owner.imgUrl || "/default-user.png",
      songs: playlistToEdit?.songs.length || 0,
      duration: playlistToEdit?.duration || "",
      isPublic: playlistToEdit?.isPublic || false,
    },
  };

  isLoading && <Loader />;

  return (
    <section ref={container} className="playlist-edit">
      <PlaylistEditHero {...heroProps} />
      <div className={`playlist-edit-actions ${isActive && "stick"}`}>
        {playlistToEdit.songs && playlistToEdit.songs.length > 0 && (
          <PlayBtn item={playlistToEdit} />
        )}
        <PlaylistMenu
          container={container}
          modelSize={{ width: 208, height: 30 * 3 + 24 }}
          playlistId={playlistToEdit.id}
        />
      </div>
      <PlaylistSongsList
        songs={playlistToEdit.songs}
        isOwner={true}
        container={container}
        onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
        isLoggedIn={!!user}
        isActive={isActive}
      />
      <PlaylistEditSearch
        addSongToPlaylistEdit={addSongToPlaylistEdit}
        playlistId={id}
        container={container}
      />
      <div className="actions-sentinel" ref={sentinelRef}></div>
    </section>
  );
}
