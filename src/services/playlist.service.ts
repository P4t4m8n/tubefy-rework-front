import {
  IPlaylist,
  IPlaylistDTO,
  IPlaylistFilter,
} from "../models/playlist.model";
import { httpService } from "./http.service";

const BASE_URL = "playlist/";

const query = async (FilterSortBy: IPlaylistFilter): Promise<IPlaylist[]> => {
  return await httpService.get<IPlaylist[]>(BASE_URL, FilterSortBy);
};

const save = async (playlist: IPlaylistDTO): Promise<IPlaylist> => {
  try {
    if (!playlist.id) {
      return await _create(playlist);
    } else {
      return await _update(playlist);
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

const getEmptyPlaylist = (userId: string): IPlaylistDTO => {
  return {
    name: "",
    imgUrl: "",
    createByUserId: userId,
    duration: 0,
    description: "",
  };
};

const playlistToPlayListDTO = (playlist: IPlaylist): IPlaylistDTO => {
  return {
    id: playlist.id,
    name: playlist.name,
    imgUrl: playlist.imgUrl,
    createByUserId: playlist.createBy.id,
    duration: playlist.duration,
    description: playlist.description,
  };
};

const getLikedPlaylists = async (userId: string): Promise<IPlaylist[]> => {
  try {
    const playlists = await httpService.get<IPlaylist[]>(
      `${BASE_URL}/liked/${userId}`
    );

    if (!playlists) throw new Error("No playlists found");
    return playlists;
  } catch (error) {
    throw new Error(`Error while fetching liked playlists: ${error}`);
  }
};

const getDefaultStations = async (): Promise<IPlaylist[]> => {
  try {
    const playlist = await httpService.get<IPlaylist[]>(
      `${BASE_URL}`
    );

    if (!playlist) throw new Error("No default station found");
    return playlist;
  } catch (error) {
    throw new Error(`Error while fetching default station: ${error}`);
  }
};

// Private functions
const _create = (playlist: IPlaylistDTO): Promise<IPlaylist> => {
  return httpService.post<IPlaylist>(BASE_URL, playlist);
};

const _update = (playlist: IPlaylistDTO): Promise<IPlaylist> => {
  return httpService.put<IPlaylist>(`${BASE_URL}/${playlist.id}`, playlist);
};

export const playlistService = {
  query,
  save,
  remove,
  addSong,
  removeSong,
  getEmptyPlaylist,
  playlistToPlayListDTO,
  getLikedPlaylists,
  getDefaultStations,
};
