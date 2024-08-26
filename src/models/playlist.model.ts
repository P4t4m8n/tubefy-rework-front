import { TGreetings } from "../util/user.util";
import { IItemType } from "./app.model";
import { ISong, ISongYT } from "./song.model";
import { IUserSmall } from "./user.model";

//Interfaces
export interface IPlaylist extends IItemType {
  id?: string;
  name: string;
  createdAt: string;
  imgUrl: string;
  isPublic: boolean;
  owner: IUserSmall;
  duration: string;
  genres: TGenres[];
  songs: ISong[];
  types: TPlaylistType[];

  description: string | null; //TODO make description creation behaver
}
export interface IPlaylistDetailed extends IPlaylist {
  isLikedByUser: boolean;
  createdAt: string;
}
export interface IPlaylistYT {
  name: string;
  imgUrl: string;
  songs: ISongYT[];
  description: string;
  duration: string;
  isPublic: boolean;
}
export interface IPlaylistsGroup {
  type: TPlaylistType | TGreetings | string;
  playlists: IPlaylist[];
}
export interface IPlaylistFilter {
  genres?: TGenres[];
  name?: string;
  ownerId?: string;
  artist?: string;
  isPublic?: boolean;
  limit?: number;
  page?: number;
  isLiked?: boolean;
  types?: TPlaylistType[];
}
export interface IPlaylistModelData {
  playlistsId: string;
  playlistsName: string;
  playlistImg: string;
}

//DTOs
export interface IPlaylistDTO {
  id?: string;
  name: string;
  ownerId: string;
  isPublic: boolean;
  imgUrl: string;
  description: string;
  duration: string;
}

//Redux
export const SET_MAIN_PLAYLISTS = "SET_MAIN_PLAYLISTS";
export const SET_USER_PLAYLISTS = "SET_USER_PLAYLISTS";
export const SET_LIKED_PLAYLIST = "SET_LIKED_PLAYLIST";
export const SET_PLAYLISTS_BULK = "SET_PLAYLISTS_BULK";
export interface IPlaylistState {
  mainPlaylists: IPlaylistsGroup[];
  userPlaylists: IPlaylistDetailed[];
  likedPlaylist: IPlaylistDetailed | null;
}

export interface ISetMainPlaylistsAction {
  type: typeof SET_MAIN_PLAYLISTS;
  payload: IPlaylistsGroup[];
}
export interface ISetUserPlaylistsAction {
  type: typeof SET_USER_PLAYLISTS;
  payload: IPlaylistDetailed[];
}
export interface ISetLikedPlaylistAction {
  type: typeof SET_LIKED_PLAYLIST;
  payload: IPlaylistDetailed;
}
export interface ISetPlaylistsBulkAction {
  type: typeof SET_PLAYLISTS_BULK;
  payload: {
    userPlaylists: IPlaylistDetailed[];
    likedPlaylist: IPlaylistDetailed;
  };
}

export type TPlaylistActionTypes =
  | ISetMainPlaylistsAction
  | ISetUserPlaylistsAction
  | ISetLikedPlaylistAction
  | ISetPlaylistsBulkAction;

//Types

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
  | "Chill-out "
  | "New Wave"
  | ""
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
