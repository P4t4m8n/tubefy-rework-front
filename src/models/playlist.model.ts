import { TGreetings } from "../util/user.util";
import { IItemType, TGenres } from "./app.model";
import { ISong, ISongYT } from "./song.model";
import { IUserSmall } from "./user.model";

//Interfaces
export interface IPlaylistSmall extends IItemType {
  id: string;
  name: string;
  imgUrl: string;
  isPublic?: boolean;
}
export interface IPlaylist extends IPlaylistSmall {
  createdAt: string;
  owner: IUserSmall;
  duration: string;
  genres: TGenres[];
  songs: ISong[];
  types: TPlaylistType[];

  description: string | null; 
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
  type?: TPlaylistType;
  songName?: string;
}
export interface IPlaylistModelData {
  playlistsId: string;
  playlistsName: string;
  playlistImg: string;
}

//DTOs
export interface IPlaylistDTO {
  name: string;
  ownerId: string;
  isPublic: boolean;
  description: string;
  types: TPlaylistType[];
  genres: TGenres[];
  createdAt: string;
  id?: string;
  imgUrl: string;
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
export type TPlaylistType = (typeof PLAYLISTS_TYPES)[number] &
  (typeof PLAYLISTS_TYPES_USER)[number];

export const PLAYLISTS_TYPES = [
  "New Music",
  "Chill",
  "Workout",
  "Party",
  "Sleep",
  "Travel",
  "Cooking",
  "Study",
  "New Wave",
  "Other",
  "Popular",
  "Charts",
  "Decades",
  "Mood",
  "Live",
  "Driving",
  "Coding",
] as const;

//User specific
export const PLAYLISTS_TYPES_USER = ["Liked Songs", "User", "Friends"] as const;
