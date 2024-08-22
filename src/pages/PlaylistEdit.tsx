import { useNavigate, useParams } from "react-router-dom";
import { IPlaylistDetailed } from "../models/playlist.model";
import { ChangeEvent, useState } from "react";
import { playlistService } from "../services/playlist.service";
import Loader from "../components/Loader";
import { DotsSVG } from "../components/svg/SVGs";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { uploadImg } from "../services/imgUpload.service";
import { saveUserPlaylist } from "../store/actions/playlist.action";
import PlaylistEditHero from "../components/PlaylistEdit/PlaylistEditHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import GenericModel from "../components/GenericComponents/GenericModel";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";
import PlaylistEditSearch from "../components/PlaylistEdit/PlaylistEditSearch";

export default function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffectUpdate(() => {
    if (!id) {
      navigate("/");
      return;
    }
    loadPlaylist(id);
  }, [id]);

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
    const imgUrl = imgUrlData ? await uploadImg(imgUrlData) : "";
    const updatedPlaylist = {
      ...playlistToEdit!,
      imgUrl,
      name,
      description,
      isPublic,
    };

    saveUserPlaylist(updatedPlaylist);
  };

  if (!playlistToEdit) return <Loader />;

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
      <PlaylistSongsList songs={playlistToEdit.songs} modelItems={[]} />
      <PlaylistEditSearch />
    </section>
  );
}
