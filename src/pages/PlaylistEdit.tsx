import { IUserSmall } from "../models/user.model";
import Loader from "../components/Loader";
import PlaylistEditHero from "../components/PlaylistEdit/PlaylistEditHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import PlaylistEditSearch from "../components/PlaylistEdit/PlaylistEditSearch";
import { usePlaylistEdit } from "../hooks/usePlaylistEdit";
import PlaylistMenu from "../components/Menus/PlaylistMenu/PlaylistMenu";
import { useRef } from "react";

interface Props {
  user?: IUserSmall;
}
export default function PlaylistEdit({ user }: Props) {
  const { playlistToEdit, onUploadImg, onSavePlaylist, onSaveYTSong } =
    usePlaylistEdit(user?.id);
  const container = useRef<HTMLDivElement | HTMLUListElement>(null);
  if (!playlistToEdit) return <Loader />;
  const { id } = playlistToEdit;

  const heroProps = {
    imgUrl: playlistToEdit.imgUrl,
    onUploadImg,
    onSaveHero: onSavePlaylist,
    infoData: {
      name: playlistToEdit?.name || "",
      description: playlistToEdit?.description || "",
      username: playlistToEdit?.owner.username || "",
      avatarUrl: playlistToEdit?.owner.imgUrl || "",
      songs: playlistToEdit?.songs.length || 0,
      duration: playlistToEdit?.duration || "",
      isPublic: playlistToEdit?.isPublic || false,
    },
  };

  return (
    <section ref={container} className="playlist-edit">
      <PlaylistEditHero {...heroProps} />
      <div className="playlist-edit-actions">
        {playlistToEdit.songs && playlistToEdit.songs.length > 0 && (
          <PlayBtn item={playlistToEdit} />
        )}
        <PlaylistMenu
          container={container}
          modelClass="playlist-edit-model"
          modelSize={{ width: 208, height: 30 * 3 + 24 }}
          playlistId={playlistToEdit.id}
        />
      </div>
      {/* <PlaylistSongsList
        songs={playlistToEdit.songs}
        playlistModelData={playlistModelData}
        isOwner={true}
        onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
      /> */}
      <PlaylistEditSearch onSaveYTSong={onSaveYTSong} playlistId={id} />
    </section>
  );
}
