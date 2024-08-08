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

const toggleSongLike = async (songId: string): Promise<boolean> => {
  try {
    return await httpService.post(`${BASE_URL}like/${songId}`);
  } catch (error) {
    throw new Error(`Error while liking song: ${error}`);
  }
};

export const songService = {
  query,
  toggleSongLike: toggleSongLike,
};
