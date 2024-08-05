import { TGenres } from "./playlist.model";
import { IUserSmall } from "./user.model";

export interface ISong {
  youtubeId: string;
  thumbnail: string;
  name: string;
  isLikedByUser: boolean;
  id: string;
  genres: TGenres[];
  duration: string;
  artist: string;
  addedBy: IUserSmall;
  addedAt: string;
}

export interface ISongFIlter {
  name?: string;
  artist?: string;
  genres?: TGenres[];
}

export interface ISongDTO {
  name: string;
  artist: string;
  duration: number;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
}

export interface ISongYT {
  name: string;
  artist: string;
  duration: string;
  youtubeId: string;
  thumbnail: string;
  addedBy: string;
  createAt: Date;
}
