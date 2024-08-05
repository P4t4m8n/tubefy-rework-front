import { ISong, ISongFIlter } from "../models/song.model";
import { httpService } from "./http.service";

const get = async (filter: ISongFIlter): Promise<ISong[]> => {
  try {
    const songs = await httpService.get<ISong[]>("/songs", filter);
    if (!songs) {
      throw new Error("No songs found");
    }
    return songs;
  } catch (error) {
    throw new Error(`Error while loading songs: ${error}`);
  }
};

export const songService = {
  get,
};
