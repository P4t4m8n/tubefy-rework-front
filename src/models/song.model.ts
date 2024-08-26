import { IItemType } from "./app.model";
import { TGenres } from "./playlist.model";
import { IUserSmall } from "./user.model";

//Interfaces
export interface ISong extends IItemType {
  youtubeId: string;
  imgUrl: string;
  name: string;
  isLikedByUser: boolean;
  id: string;
  genres: TGenres[];
  duration: string;
  artist: string;
  addedBy: IUserSmall;
  addedAt: string;
}
export interface ISongYT extends IItemType {
  name: string;
  artist: string;
  duration: string;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  addedAt: string;
}
export interface ISongFIlter {
  name?: string;
  artist?: string;
  genres?: TGenres[];
}
//Dto
export interface ISongDTO {
  name: string;
  artist: string;
  duration: number;
  youtubeId: string;
  imgUrl: string;
  addedBy: string;
  createAt: Date;
}
