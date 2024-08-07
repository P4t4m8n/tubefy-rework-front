import { IPlaylist } from "../models/playlist.model";
import { ISong, ISongYT } from "../models/song.model";

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} `;
};

export const isSong = (
  item: ISong | IPlaylist | ISongYT
): item is ISong | ISongYT => {
  return (item as ISong).youtubeId !== undefined;
};
