import { LikeBtn } from "../components/Buttons/LikeBtn";
import {
  isAllowedToEditPlaylist,
  transformUserPlaylistsStateForModel,
} from "../util/playlist.util";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import Loader from "../components/Loader";
import { usePlaylistEdit } from "../hooks/usePlaylistEdit";
import { useAppSelector } from "../hooks/useStore";
import GenericModel from "../components/GenericComponents/GenericModel";
import { DotsSVG } from "../components/svg/SVGs";
import { redirect } from "react-router-dom";

export default function PlaylistDetails() {
  const user = useAppSelector((state) => state.user.user);
  const {
    playlistToEdit: playlist,
    onRemoveSongFromPlaylist,
    isLoading,
    getPlaylistItemActions,
  } = usePlaylistEdit(user?.id);

  if (isLoading) return <Loader />;
  if (!playlist) return redirect("/");

  const { name, imgUrl, owner, songs, duration, id } = playlist!;
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

  const isAllowedToEdit = isAllowedToEditPlaylist(id, user?.id);
  const items = getPlaylistItemActions();
  console.log("items:", items);

  return (
    <section className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className="playlist-details-actions">
        <PlayBtn item={playlist} />
        <LikeBtn item={playlist} />
        {user && isAllowedToEdit && (
          <GenericModel
            items={items}
            btnSvg={<DotsSVG />}
            className="details"
            coords={{ x: 0, y: 24 }}
            modelSize={{ x: 208, y: 30 * items.length + 48 }}
          />
        )}
      </div>
      <PlaylistSongsList
        isOwner={isAllowedToEdit}
        songs={songs}
        playlistModelData={playlistModelData}
        onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
      />
    </section>
  );
}
