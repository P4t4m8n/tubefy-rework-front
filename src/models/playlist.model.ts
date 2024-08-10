import { TGreetings } from "../util/user.util";
import { ISong, ISongYT } from "./song.model";
import { IUserSmall } from "./user.model";

//Constants
export const SET_MAIN_PLAYLISTS = "SET_MAIN_PLAYLISTS";
export const SET_USER_PLAYLISTS = "SET_USER_PLAYLISTS";
export const ADD_PLAYLIST_TO_USER_PLAYLISTS = "ADD_PLAYLIST_TO_USER_PLAYLISTS";


//Interfaces
export interface IPlaylist {
  createdAt: string;
  description: string | null; 
  duration: string;
  genres: TGenres[];
  id?: string;
  imgUrl: string;
  isPublic: boolean;
  name: string;
  owner: IUserSmall;
  songs: ISong[];
  types: TPlaylistType[] | string[];
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
  ownerId:string;
  isPublic: boolean;
  imgUrl: string;
  description: string;
  duration: string;
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
  type: TPlaylistType | TGreetings | string;
  playlists: IPlaylist[];
}
export interface IPlaylistState {
  mainPlaylists: IPlaylistObject[];
  userPlaylists: IPlaylist[];
}
export interface ISetMainPlaylistsAction {
  type: typeof SET_MAIN_PLAYLISTS;
  payload: IPlaylistObject[];
}

export interface ISetUserPlaylistsAction {
  type: typeof SET_USER_PLAYLISTS;
  payload: IPlaylist[];
}

//Types
export type TPlaylistActionTypes =
  | ISetMainPlaylistsAction
  | ISetUserPlaylistsAction


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
  | "New Wave"
  | "Liked Songs";

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
