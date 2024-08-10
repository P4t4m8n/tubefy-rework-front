import { useParams } from "react-router-dom";
import { IPlaylistDetailed } from "../models/playlist.model";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

interface Props {
  user?: IUserSmall;
}

export default function PlaylistEdit({ user }: Props) {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const { id } = useParams();

  const userPlaylistsLength = store.getState().playlists.userPlaylists.length;

  useEffect(() => {
    if (id) {
      loadPlaylist(id);
    } else {
      const emptyPlaylist = getEmptyPlaylist(userPlaylistsLength);
      if (user) {
        emptyPlaylist.owner = user;
      }
      setPlaylistToEdit(emptyPlaylist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

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

  const onSavePlaylist = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    const formData = new FormData(ev.currentTarget);

    // Extract data from FormData
    const imgUrlData = formData.get("imgUrl") as File | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const isPublic = formData.get("isPublic") ;
    
    const imgUrl = imgUrlData ? URL.createObjectURL(imgUrlData) : "";
    
    console.log("isPublic:", !!isPublic)
    console.log("imgUrl:", imgUrl);
    console.log("Name:", name);
    console.log("Description:", description);

    
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
