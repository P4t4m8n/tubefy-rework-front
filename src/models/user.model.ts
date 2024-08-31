import { IFriend } from "./friend.model";
import { IPlaylistDetailed } from "./playlist.model";

export interface IUserSmall {
  username: string;
  id: string;
  imgUrl?: string;
  isAdmin?: boolean;
}
export interface IUser extends IUserSmall {
  password?: string;
  email: string;
}
export interface IUserFilter {
  username?: string;
  email?: string;
}
// DTO
export interface IFullUserDTO {
  email: string;
  friends: IFriend[];
  friendsRequest: IFriend[];
  likedSongsPlaylist: IPlaylistDetailed;
  playlists: IPlaylistDetailed[];
  user: IUser;
}
export interface IUserDTO {
  email?: string;
  password?: string;
  username?: string;
  imgUrl?: string;
  isAdmin?: boolean;
  id?: string;
}
//Redux
export const SET_USER = "SET_USER";
export interface IUserState {
  user: IUser | null;
}
export interface IUserAction {
  type: TUserActionType;
  payload: IUser | null;
}
export type TUserActionType = typeof SET_USER;
