import {
  ILikedSongPlaylist,
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistDTO,
  IPlaylistFilter,
} from "../models/playlist.model";
import { httpService } from "./http.service";

const BASE_URL = "playlist/";

const query = async (FilterSortBy: IPlaylistFilter): Promise<IPlaylist[]> => {
  return await httpService.get<IPlaylist[]>(BASE_URL, FilterSortBy);
};

const get = async (id: string): Promise<IPlaylistDetailed> => {
  try {
    const playlist = await httpService.get<IPlaylistDetailed>(
      `${BASE_URL}${id}`
    );
    if (!playlist)
      throw new Error("Error in playlist-service - No playlist found");
    return playlist;
  } catch (error) {
    throw new Error(
      `Error in playlist-service - Error while fetching playlist: ${error}`
    );
  }
};

const save = async (playlist: IPlaylist): Promise<IPlaylistDetailed> => {
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

const addSong = async (playlistId: string, songId: string): Promise<void> => {
  try {
    await httpService.post(`${BASE_URL}/${playlistId}/song/${songId}`);
  } catch (error) {
    throw new Error(`Error while adding song to playlist: ${error}`);
  }
};

const removeSong = async (
  playlistId: string,
  songId: string
): Promise<void> => {
  try {
    await httpService.delete(`${BASE_URL}/${playlistId}/song/${songId}`);
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
    isPublic: playlist.isPublic,
  };
};

const getUserLikedPlaylists = async (): Promise<IPlaylist[]> => {
  try {
    const playlists = await httpService.get<IPlaylist[]>(`${BASE_URL}/liked`);

    if (!playlists) throw new Error("No playlists found");
    return playlists;
  } catch (error) {
    throw new Error(`Error while fetching liked playlists: ${error}`);
  }
};

const getUserPlaylists = async (): Promise<{
  likedSongsPlaylist: ILikedSongPlaylist;
  OwnedPlaylist: IPlaylistDetailed[];
}> => {
  try {
    const playlists = await httpService.get<{
      likedSongsPlaylist: ILikedSongPlaylist;
      OwnedPlaylist: IPlaylistDetailed[];
    }>(`${BASE_URL}user`);

    return playlists;
  } catch (error) {
    throw new Error(`Error while fetching user playlists: ${error}`);
  }
};

const getDefaultStations = async (): Promise<IPlaylist[]> => {
  try {
    const playlist = await httpService.get<IPlaylist[]>(`${BASE_URL}`);

    if (!playlist) throw new Error("No default station found");
    return playlist;
  } catch (error) {
    throw new Error(`Error while fetching default station: ${error}`);
  }
};

const getUserLikedSongsPlaylistById = async (
  id: string
): Promise<IPlaylistDetailed> => {
  try {
    const playlist = await httpService.get<IPlaylistDetailed>(
      `${BASE_URL}user/${id}`
    );
    return playlist;
  } catch (error) {
    throw new Error(`Error while fetching liked songs playlist: ${error}`);
  }
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
    throw new Error(`Error while updating playlist likes: ${error}`);
  }
};

// Private functions
const _create = (playlist: IPlaylistDTO): Promise<IPlaylistDetailed> => {
  return httpService.post<IPlaylistDetailed>(`${BASE_URL}edit`, playlist);
};

const _update = (playlist: IPlaylistDTO): Promise<IPlaylistDetailed> => {
  return httpService.put<IPlaylistDetailed>(
    `${BASE_URL}edit/${playlist.id}`,
    playlist
  );
};

export const playlistService = {
  query,
  get,
  save,
  remove,
  addSong,
  removeSong,
  playlistToPlayListDTO,
  getUserLikedPlaylists,
  getDefaultStations,
  togglePlaylistLIke,
  getUserPlaylists,
  getUserLikedSongsPlaylistById,
};
