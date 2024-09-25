import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistDTO,
  IPlaylistFilter,
  IPlaylistsGroup,
} from "../models/playlist.model";
import { httpService } from "./http.service";

const BASE_URL = "playlist/";

const query = async (FilterSortBy: IPlaylistFilter): Promise<IPlaylist[]> => {
  return await httpService.get<IPlaylist[]>(BASE_URL, FilterSortBy);
};

const get = async (id: string): Promise<IPlaylistDetailed> => {
  return await httpService.get<IPlaylistDetailed>(`${BASE_URL}${id}`);
};

const save = async (playlist: IPlaylist): Promise<IPlaylistDTO> => {
  const playlistDto = playlistToPlayListDTO(playlist);
  try {
    if (!playlist.id) {
      return await _create(playlistDto);
    } else {
      return await _update(playlistDto);
    }
  } catch (error) {
    throw new Error(`Error while saving playlist: ${error}`);
  }
};

const remove = async (id: string): Promise<boolean> => {
  try {
    await httpService.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    throw new Error(`Error while removing playlist: ${error}`);
  }
};

const addSong = async (
  playlistId: string,
  songId: string
): Promise<boolean> => {
  try {
    return await httpService.post(`${BASE_URL}/${playlistId}/songs`, {
      songId,
    });
  } catch (error) {
    throw new Error(`Error while adding song to playlist: ${error}`);
  }
};

const removeSong = async (
  playlistId: string,
  songId: string,
  isOwnerId: string
): Promise<boolean> => {
  try {
    return await httpService.delete(`${BASE_URL}/${playlistId}/songs`, {
      songId,
      isOwnerId,
    });
  } catch (error) {
    throw new Error(`Error while removing song from playlist: ${error}`);
  }
};

const playlistToPlayListDTO = (playlist: IPlaylist): IPlaylistDTO => {
  return {
    id: playlist.id,
    name: playlist.name,
    imgUrl: playlist.imgUrl,
    ownerId: playlist.owner.id,
    duration: playlist.duration,
    description: "",
    isPublic: playlist?.isPublic || false,
    genres: playlist.genres,
    types: playlist.types,
    createdAt: playlist.createdAt,
  };
};

const getDefaultStations = async (): Promise<IPlaylistsGroup[]> => {
  return await httpService.get<IPlaylistsGroup[]>(`${BASE_URL}default`);
};

const togglePlaylistLIke = async (
  id: string,
  isLiked: boolean
): Promise<boolean> => {
  try {
    if (isLiked) {
      return await httpService.delete(`${BASE_URL}${id}/like`);
    } else {
      return await httpService.post(`${BASE_URL}${id}/like`);
    }
  } catch (error) {
    console.error(`Error while liking playlist: ${error}`);
    throw new Error(`Unable to like playlist`);
  }
};

const sharePlaylist = async (
  playlistId: string,
  friendId: string
): Promise<void> => {
  return await httpService.post(`${BASE_URL}${playlistId}/share`, { friendId });
};

const updateSharedPlaylist = async (
  playlistId: string,
  friendId: string,
  isOpen: boolean
): Promise<void> => {
  return await httpService.put(`${BASE_URL}${playlistId}/share`, {
    friendId,
    isOpen,
  });
};

const approveSharedPlaylist = async (
  playlistId: string,
  notificationId: string
): Promise<IPlaylistDetailed> => {
  return await httpService.put(
    `${BASE_URL}${playlistId}/share/${notificationId}`
  );
};
const rejectSharedPlaylist = async (
  playlistId: string,
  notificationId: string
): Promise<void> => {
  return await httpService.delete(
    `${BASE_URL}${playlistId}/share/${notificationId}`
  );
};

const removeSharedPlaylist = async (
  playlistId: string,
  friendId: string
): Promise<void> => {
  return await httpService.delete(`${BASE_URL}${playlistId}/share`, {
    friendId,
  });
};

// Private functions
const _create = (playlist: IPlaylistDTO): Promise<IPlaylistDTO> => {
  return httpService.post<IPlaylistDTO>(`${BASE_URL}edit`, playlist);
};

const _update = (playlist: IPlaylistDTO): Promise<IPlaylistDTO> => {
  return httpService.put<IPlaylistDTO>(
    `${BASE_URL}edit/${playlist.id}`,
    playlist
  );
};

//Service Object
export const playlistService = {
  query,
  get,
  save,
  remove,
  addSong,
  removeSong,
  playlistToPlayListDTO,
  getDefaultStations,
  togglePlaylistLIke,
  sharePlaylist,
  updateSharedPlaylist,
  removeSharedPlaylist,
  approveSharedPlaylist,
  rejectSharedPlaylist,
};
