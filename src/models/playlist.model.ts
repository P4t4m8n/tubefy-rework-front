import { TGreetings } from "../util/user.util";
import { ISong } from "./song.model";
import { IUserSmall } from "./user.model";

export interface IPlaylist {
  name: string;
  genres: TGenres[];
  songs: ISong[];
  description: string;
  type: TPlaylistType;
  owner: IUserSmall;
  duration: string;
  isPublic: boolean;
  imgUrl: string;
  id: string;
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
  genres: TGenres[];
  name: string;
  createBy: IUserSmall;
}

export interface IPlaylistObject {
  type: TPlaylistType | TGreetings;
  playlists: IPlaylist[];
}
export interface IPlaylistState {
  mainPlaylists: IPlaylistObject[];
  currentPlaylist: IPlaylist | null;
}
export const SET_MAIN_PLAYLISTS = "SET_MAIN_PLAYLISTS";
export const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST";

export type TPlaylistActionType =
  | typeof SET_MAIN_PLAYLISTS
  | typeof SET_CURRENT_PLAYLIST;

export interface ISetMainPlaylistsAction {
  type: typeof SET_MAIN_PLAYLISTS;
  payload: IPlaylistObject[];
}

export interface ISetCurrentPlaylistAction {
  type: typeof SET_CURRENT_PLAYLIST;
  payload: IPlaylist;
}

export type PlaylistActionTypes =
  | ISetMainPlaylistsAction
  | ISetCurrentPlaylistAction;

export type TPlaylistType =
  | "New Music"
  | "Daily mix"
  | " Chill"
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
