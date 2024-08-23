import { DotsSVG } from "../components/svg/SVGs";
import { transformUserPlaylistsStateForModel } from "../util/playlist.util";
import { IUserSmall } from "../models/user.model";
import Loader from "../components/Loader";
import PlaylistEditHero from "../components/PlaylistEdit/PlaylistEditHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import GenericModel from "../components/GenericComponents/GenericModel";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistEditSearch from "../components/PlaylistEdit/PlaylistEditSearch";
import { usePlaylistEdit } from "../hooks/usePlaylistEdit";

interface Props {
  user?: IUserSmall;
}
export default function PlaylistEdit({ user }: Props) {
  const {
    playlistToEdit,
    onUploadImg,
    onSavePlaylist,
    onSaveYTSong,
    onRemoveSongFromPlaylist,
  } = usePlaylistEdit(user?.id);

  if (!playlistToEdit) return <Loader />;
  const { id } = playlistToEdit;

  const playlistModelData = transformUserPlaylistsStateForModel(id);

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
      shares: playlistToEdit?.shares.count || 0,
      isPublic: playlistToEdit?.isPublic || false,
    },
  };

  return (
    <section className="playlist-edit">
      <PlaylistEditHero {...heroProps} />
      <div className="playlist-edit-actions">
        {playlistToEdit.songs && playlistToEdit.songs.length > 0 && (
          <PlayBtn item={playlistToEdit} />
        )}
        <GenericModel btnSvg={<DotsSVG />} items={[]} />
      </div>
      <PlaylistSongsList
        songs={playlistToEdit.songs}
        playlistModelData={playlistModelData}
        isOwner={true}
        onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
      />
      <PlaylistEditSearch onSaveYTSong={onSaveYTSong} playlistId={id} />
    </section>
  );
}
