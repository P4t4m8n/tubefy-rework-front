import { useParams } from "react-router-dom";
import { IPlaylistDetailed } from "../models/playlist.model";
import { ChangeEvent, useState } from "react";
import { playlistService } from "../services/playlist.service";
import { getEmptyPlaylist } from "../util/playlist.util";
import { IUserSmall } from "../models/user.model";
import PlaylistEditHero from "../components/PlaylistEdit/PlaylistEditHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import { Loader } from "../components/Loader";
import GenericModel from "../components/GenericComponents/GenericModel";
import { DotsSVG } from "../components/svg/SVGs";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistEditSearch from "../components/PlaylistEdit/PlaylistEditSearch";
import { store } from "../store/store";
import { useEffectUpdate } from "../hooks/useEffectUpdate";

interface Props {
  user?: IUserSmall;
}

export default function PlaylistEdit({ user }: Props) {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const { id } = useParams();

  const userPlaylistsLength = store.getState().playlists.userPlaylists.length;

  useEffectUpdate(() => {
    if (id) {
      loadPlaylist(id);
    } else {
      createPlaylist();
    }
  }, [id]);

  const createPlaylist = async () => {
    try {
      const emptyPlaylist = getEmptyPlaylist(userPlaylistsLength);
      emptyPlaylist.owner = user!;
      const _playlist = await playlistService.save(emptyPlaylist);
      setPlaylistToEdit(_playlist);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const loadPlaylist = async (id: string) => {
    try {
      const playlist = await playlistService.get(id);
      setPlaylistToEdit(playlist);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const onUploadImg = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev?.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);

    setPlaylistToEdit((prev) => ({ ...prev!, imgUrl }));
  };

  const onSavePlaylist = async (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => {
    const { imgUrlData, name, description, isPublic } = HeroData;
  
  };

  if (!playlistToEdit) return <Loader />;

  const heroProps = {
    imgUrl: playlistToEdit.imgUrl,
    onUploadImg,
    onSaveHero: onSavePlaylist,
    infoData: {
      name: playlistToEdit?.name || "asdsadasdas",
      description: playlistToEdit?.description || "dsadSADdsa",
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
      <PlaylistSongsList songs={playlistToEdit.songs} modelItems={[]} />
      <PlaylistEditSearch />
    </section>
  );
}
