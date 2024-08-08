import { IPlaylistDetailed } from "../models/playlist.model";
import { ISong, ISongYT } from "../models/song.model";

export const isYTSong = (
  item: ISong | IPlaylistDetailed | ISongYT
): boolean => {
    if(!item) return false;
  if ("youtubeId" in item) {
    return !("id" in item);
  }
  return false;
};
