import { TGreetings } from "../util/user.util";
import { ISong, ISongYT } from "./song.model";
import { IUserSmall } from "./user.model";

//Constants
export const SET_MAIN_PLAYLISTS = "SET_MAIN_PLAYLISTS";

//Interfaces
export interface IPlaylist {
  name: string;
  imgUrl: string;
  songs: ISong[];
  description: string;
  genres: TGenres[];
  type: TPlaylistType;
  owner: IUserSmall;
  duration: string;
  isPublic: boolean;
  id: string;
}
export interface IPlaylistYT {
  name: string;
  imgUrl: string;
  songs: ISongYT[];
  description: string;
  duration: string;
  isPublic: boolean;
}
export interface IPlaylistDetailed extends IPlaylist {
  isLikedByUser: boolean;
  createdAt: string;
  shares: {
    count: number;
  };
}
export interface IPlaylistDTO {
  id?: string;
  name: string;
  imgUrl: string;
  createByUserId: string;
  duration: string;
  description: string;
}
export interface IPlaylistFilter {
  genres?: TGenres[];
  name?: string;
  ownerId?: string;
  artist?: string;
  isPublic?: boolean;
  limit?: number;
  page?: number;
}
export interface IPlaylistObject {
  type: TPlaylistType | TGreetings;
  playlists: IPlaylist[];
}
export interface IPlaylistState {
  mainPlaylists: IPlaylistObject[];
}
export interface ISetMainPlaylistsAction {
  type: typeof SET_MAIN_PLAYLISTS;
  payload: IPlaylistObject[];
}

//Types
export type TPlaylistActionTypes = ISetMainPlaylistsAction;

export type TPlaylistType =
  | "New Music"
  | "Daily mix"
  | "Chill"
  | "Workout"
  | "Party"
  | "Focus"
  | "Sleep"
  | "Travel"
  | "Kids"
  | "Cooking"
  | "Wellness"
  | "Study"
  | "Chillout"
  | "New Wave";

export type TGenres =
  | "pop"
  | "rock"
  | "jazz"
  | "blues"
  | "hip-hop"
  | "rap"
  | "country"
  | "classical"
  | "folk"
  | "latin"
  | "metal"
  | "reggae"
  | "soul"
  | "electronic"
  | "dance"
  | "indie"
  | "alternative"
  | "punk"
  | "r&b"
  | "funk"
  | "disco"
  | "techno"
  | "house"
  | "trance"
  | "dubstep"
  | "drum&bass"
  | "ambient"
  | "chillout"
  | "downtempo"
  | "reggaeton"
  | "ska"
  | "grunge"
  | "emo"
  | "gothic"
  | "hardcore"
  | "hardstyle"
  | "industrial"
  | "new wave"
  | "noise"
  | "psychedelic"
  | "ska"
  | "synthpop"
  | "trap"
  | "vaporwave"
  | "world"
  | "other";
