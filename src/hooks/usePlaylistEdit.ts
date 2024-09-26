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
import { ISong, ISongYT } from "../models/song.model";
import { utilService } from "../util/util.util";

export const usePlaylistEdit = (
  userId: string | null | undefined
): {
  playlistToEdit: IPlaylistDetailed | null;
  isLoading: boolean;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onUpdatePlaylist: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
  onSaveYTSong: (songYT: ISongYT, playlistId: string) => Promise<void>;
  onRemoveSongFromPlaylist: (songId: string) => void;
  addSongToPlaylistEdit: (song: ISong) => void;
} => {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffectUpdate(() => {
    if (!id) {
      utilService.handleError(
        "Playlist not found",
        "PLAYLIST_EDIT",
        new Error("Playlist not found")
      );
      navigate("/");
      return;
    }
    loadPlaylist(id);
  }, [id]);

  const loadPlaylist = async (id: string) => {
    try {
      const playlist = await playlistService.get(id);

      setPlaylistToEdit(playlist);
      setImgForBackground(playlist.imgUrl || "/default-playlist.png");
    } catch (error) {
      utilService.handleError(
        "Failed to load playlist",
        "PLAYLIST_EDIT",
        error as Error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onUploadImg = async (ev: ChangeEvent<HTMLInputElement>) => {
    const imgUrl = await _saveImage(ev.target.files?.[0]);
    await _savePlaylist({ ...playlistToEdit!, imgUrl });
  };

  const onUpdatePlaylist = async (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => {
    const { imgUrlData, name, description, isPublic } = HeroData;
    const imgUrl = imgUrlData?.name
      ? await _saveImage(imgUrlData)
      : playlistToEdit?.imgUrl || "";
    const updatedPlaylist = {
      ...playlistToEdit!,
      imgUrl: imgUrl || playlistToEdit?.imgUrl || "",
      name: name || playlistToEdit?.name || "",
      description: description || playlistToEdit?.description || "",
      isPublic: isPublic || playlistToEdit?.isPublic || false,
    };

    await _savePlaylist(updatedPlaylist);
  };

  const onSaveYTSong = useCallback(
    async (songYT: ISongYT, playlistId: string) => {
      try {
        const song = await addSongToPlaylist(playlistId, songYT);
        if (!song) {
          utilService.handleError(
            "Failed to save song, please try again later.",
            "PLAYLIST_EDIT",
            "Song return undefined" as unknown as Error
          );
          return;
        }
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

  const addSongToPlaylistEdit = (song: ISong) => {
    setPlaylistToEdit((prev) => {
      if (!prev) return prev;
      return { ...prev, songs: [...prev.songs, song] };
    });
  };

  const _savePlaylist = async (playlist: IPlaylistDetailed) => {
    try {
      const savedPlaylist = await saveUserPlaylist(playlist);
      if (!savedPlaylist) {
        utilService.handleError(
          "Failed to create playlist, please try again later.",
          "PLAYLIST_CREATE",
          "Playlist return undefined" as unknown as Error
        );
        return;
      }
      setPlaylistToEdit(savedPlaylist);
    } catch (error) {
      utilService.handleError(
        "Failed to save playlist",
        "PLAYLIST_EDIT",
        error as Error
      );
    }
  };

  const _saveImage = async (imgUrlData?: File | null): Promise<string> => {
    try {
      if (!imgUrlData) {
        throw new Error("No image data or image data invalid");
      }
      const imgUrl = await uploadImg(imgUrlData);
      setImgForBackground(imgUrl);
      return imgUrl;
    } catch (error) {
      utilService.handleError(
        "Failed to upload image",
        "PLAYLIST_EDIT",
        error as Error
      );
      return "";
    }
  };

  return {
    playlistToEdit,
    isLoading,
    onUploadImg,
    onUpdatePlaylist,
    onSaveYTSong,
    onRemoveSongFromPlaylist,
    addSongToPlaylistEdit,
  };
};
