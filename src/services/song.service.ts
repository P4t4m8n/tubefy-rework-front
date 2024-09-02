import { ISong, ISongFIlter, ISongYT } from "../models/song.model";
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
    console.error(`Error while liking song: ${error}`);
    throw new Error(`Unable to like song`);
  }
};

const createSong = async (song: ISongYT): Promise<ISong> => {
  try {
    const savedSong = await httpService.post<ISong>(BASE_URL + "edit", song);
    return savedSong;
  } catch (error) {
    console.error(`Error while saving song: ${error}`);
    throw new Error(`Unable to save song`);
  }
};



export const songService = {
  query,
  toggleSongLike,
  createSong,
};
