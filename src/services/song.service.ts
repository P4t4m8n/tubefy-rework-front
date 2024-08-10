import { ISong, ISongFIlter } from "../models/song.model";
import { httpService } from "./http.service";

const BASE_URL = "song/";

const query = async (filter: ISongFIlter): Promise<ISong[]> => {
  try {
    const songs = await httpService.get<ISong[]>(BASE_URL, filter);
    if (!songs) {
      throw new Error("No songs found");
    }
    return songs;
  } catch (error) {
    throw new Error(`Error while loading songs: ${error}`);
  }
};

const toggleSongLike = async (
  songId: string,
  isLiked: boolean
): Promise<boolean> => {
  try {
    if (isLiked) {
      return await httpService.delete(`${BASE_URL}${songId}/like`);
    }
    return await httpService.post(`${BASE_URL}${songId}/like`);
  } catch (error) {
    throw new Error(`Error while liking song: ${error}`);
  }
};

export const songService = {
  query,
  toggleSongLike: toggleSongLike,
};
