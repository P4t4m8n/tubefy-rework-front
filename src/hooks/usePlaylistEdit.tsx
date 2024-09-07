import { ChangeEvent, useCallback, useState } from "react";
import { IPlaylistDetailed } from "../models/playlist.model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectUpdate } from "./useEffectUpdate";
import { playlistService } from "../services/playlist.service";
import { setImgForBackground } from "../store/actions/imgGradient.action";
import { uploadImg } from "../services/imgUpload.service";
import {
  addSongToPlaylist,
  removePlaylist,
  removeSongFromPlaylist,
  saveUserPlaylist,
} from "../store/actions/playlist.action";
import { songService } from "../services/song.service";
import { ISong, ISongYT } from "../models/song.model";
import { utilService } from "../util/util.util";
import { getFriendsState, getUserPlaylistsState } from "../store/getStore";
import {
  DeleteSVG,
  PencilSVG,
  PlusSVG,
  ShareSVG,
} from "../components/svg/SVGs";
import { IModelItem } from "../models/app.model";

export const usePlaylistEdit = (
  userId: string | null | undefined
): {
  playlistToEdit: IPlaylistDetailed | null;
  isLoading: boolean;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSavePlaylist: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
  onSaveYTSong: (songYT: ISongYT, playlistId: string) => Promise<void>;
  onRemoveSongFromPlaylist: (songId: string) => void;
  onSharePlaylist: (playlistId: string, friendId?: string) => Promise<void>;
  onRemovePlaylist: (playlistId: string) => Promise<void>;
  onNavigateToEdit: (playlistId: string) => void;
  getPlaylistItemActions: () => IModelItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSongItemActions: (song: ISong) => any[];
} => {
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
      // if (playlist.owner.id !== userId) {
      //   navigate("/");
      //   return;
      // }
      playlist.imgUrl = playlist.imgUrl || "/default-playlist.png";
      setPlaylistToEdit(playlist);
      setImgForBackground(playlist.imgUrl);
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

  const onSharePlaylist = useCallback(
    async (playlistId: string, friendId?: string) => {
      try {
        if (!friendId) throw new Error("Friend not found");
        await playlistService.sharePlaylist(playlistId, friendId);
        utilService.handleSuccess("Playlist shared", "PLAYLIST_SHARE");
      } catch (error) {
        utilService.handleError(
          "playlist-share",
          "PLAYLIST_SHARE",
          error as Error
        );
      }
    },
    []
  );

  const onRemovePlaylist = useCallback(async (playlistId: string) => {
    await removePlaylist(playlistId);
    utilService.handleSuccess("Playlist removed", "PLAYLIST_DELETE");
  }, []);

  const onNavigateToEdit = useCallback((playlistId: string) => {
    navigate(`/playlist/edit/${playlistId}`);
    return;
  }, [navigate]);

  const getPlaylistItemActions = () => {
    if (!playlistToEdit) {
      utilService.handleError(
        "Playlist not found",
        "PLAYLIST_EDIT",
        new Error("Playlist not found")
      );
      return [];
    }
    const friends = getFriendsState();

    const shareItems = friends.map((friend) => ({
      text: friend.friend.username,
      imgUrl: friend.friend.imgUrl || "/default-user.png",
      onClick: () => onSharePlaylist(playlistToEdit.id, friend.id),
      modelSize: { width: 208, height: 30 * 3 + 24 },
    }));

    const items: IModelItem[] = [
      {
        btnSvg: <DeleteSVG />,
        text: "Delete",
        onClick: () => onRemovePlaylist(playlistToEdit.id),
      },
      {
        btnSvg: <PencilSVG />,
        text: "Edit",
        onClick: () => onNavigateToEdit(playlistToEdit.id),
      },
      {
        items: shareItems,
        text: "Share",
        btnSvg: <ShareSVG />,
        modelSize: { width: 208, height: 30 * 3 + 24 },
      },
    ];

    return items;
  };

  const getSongItemActions = (song: ISong) => {
    const friends = getFriendsState();
    const playlists = getUserPlaylistsState();

    const items = [
      {
        btnSvg: <DeleteSVG />,
        text: "Remove",
        onClick: () => onRemoveSongFromPlaylist(song.id),
      },
      {
        btnSvg: <ShareSVG />,
        text: "Share",
        children: friends.map((friend) => ({
          text: friend.friend.username,
          imgUrl: friend.friend.imgUrl || "/default-playlist.png",
          onClick: () => onSharePlaylist(friend.friend.id, song.id),
          modelSize: { x: 208, y: 30 * 3 + 24 },
        })),
      },
      {
        text: "Add to playlist",
        children: playlists.map((playlist) => ({
          text: playlist.name,
          imgUrl: playlist.imgUrl || "/default-playlist.png",
          onClick: () => addSongToPlaylist(playlist.id, song),
          modelSize: { x: 208, y: 30 * 3 + 24 },
        })),
        btnSvg: <PlusSVG />,
      },
    ];

    return items;
  };

  return {
    playlistToEdit,
    isLoading,
    onUploadImg,
    onSavePlaylist,
    onSaveYTSong,
    onRemoveSongFromPlaylist,
    onSharePlaylist,
    onRemovePlaylist,
    onNavigateToEdit,
    getPlaylistItemActions,
    getSongItemActions,
  };
};
