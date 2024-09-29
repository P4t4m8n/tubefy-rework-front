import { useRef } from "react";
import { IUserSmall } from "../../models/user.model";

import { usePlaylistEdit } from "../../hooks/usePlaylistEdit";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import Loader from "../Loader";
import PlaylistEditHero from "./PlaylistEditHero";
import PlayBtn from "../Buttons/PlayBtn";
import PlaylistEditSearch from "./PlaylistEditSearch";
import PlaylistMenu from "../Menus/PlaylistMenu/PlaylistMenu";
import PlaylistSongsList from "../PlaylistSongList/PlaylistSongsList";
import { getPlaylistSongsProps } from "../../util/playlist.util";

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
  const { id, songs, owner } = playlistToEdit;

  const playlistSongsProps = getPlaylistSongsProps(
    songs,
    true,
    container,
    isActive,
    !!user,
    onRemoveSongFromPlaylist
  );

  isLoading && <Loader />;

  return (
    <section ref={container} className="playlist-edit">
      <PlaylistEditHero
        owner={owner}
        playlist={playlistToEdit}
        onUpdatePlaylist={onUpdatePlaylist}
        onUploadImg={onUploadImg}
      />
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
      <PlaylistSongsList {...playlistSongsProps} />
      <PlaylistEditSearch
        addSongToPlaylistEdit={addSongToPlaylistEdit}
        playlistId={id}
        container={container}
      />
      <div className="actions-sentinel" ref={sentinelRef}></div>
    </section>
  );
}
