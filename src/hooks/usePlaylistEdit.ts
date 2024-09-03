import { ChangeEvent, useCallback, useState } from "react";
import { IPlaylistDetailed } from "../models/playlist.model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectUpdate } from "./useEffectUpdate";
import { playlistService } from "../services/playlist.service";
import { setImgForBackground } from "../store/actions/imgGradient.action";
import { uploadImg } from "../services/imgUpload.service";
import {
  addSongToPlaylist,
  removeSongFromPlaylist,
  saveUserPlaylist,
} from "../store/actions/playlist.action";
import { songService } from "../services/song.service";
import { ISongYT } from "../models/song.model";
import { utilService } from "../util/util.util";

export const usePlaylistEdit = (
  userId: string | null | undefined
): {
  playlistToEdit: IPlaylistDetailed | null;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSavePlaylist: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
  onSaveYTSong: (songYT: ISongYT, playlistId: string) => Promise<void>;
  onRemoveSongFromPlaylist: (songId: string) => void;
} => {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffectUpdate(() => {
    if (!id || !userId) {
      navigate("/");
      return;
    }
    loadPlaylist(id);
  }, [id]);

  const loadPlaylist = async (id: string) => {
    try {
      const playlist = await playlistService.get(id);
      if (playlist.owner.id !== userId) {
        navigate("/");
        return;
      }
      setPlaylistToEdit(playlist);
      setImgForBackground(playlist.imgUrl);
    } catch (error) {
      utilService.handleError(
        "Failed to load playlist",
        "PLAYLIST_EDIT",
        error as Error
      );
    }
  };

  const onUploadImg = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev?.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setImgForBackground(imgUrl);

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

    await saveUserPlaylist(updatedPlaylist);
  };

  const onSaveYTSong = useCallback(
    async (songYT: ISongYT, playlistId: string) => {
      try {
        const song = await songService.createSong(songYT);
        await addSongToPlaylist(playlistId, song);
        setPlaylistToEdit((prev) => {
          if (!prev) return prev;
          return { ...prev, songs: [...prev.songs, song] };
        });
      } catch (error) {
        utilService.handleError(
          "Failed to save song",
          "PLAYLIST_EDIT",
          error as Error
        );
      }
    },
    []
  );

  const onRemoveSongFromPlaylist = async (songId: string) => {
    if (!playlistToEdit?.id || !userId) return;
    await removeSongFromPlaylist(playlistToEdit.id, songId, userId);
    setPlaylistToEdit((prev) => {
      if (!prev) return prev;
      const updatedSongs = prev.songs.filter((song) => song.id !== songId);
      return { ...prev, songs: updatedSongs };
    });
  };

  return {
    playlistToEdit,
    onUploadImg,
    onSavePlaylist,
    onSaveYTSong,
    onRemoveSongFromPlaylist,
  };
};
