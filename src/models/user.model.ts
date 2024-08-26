import { IFriend } from "./friend.model";
import { IPlaylist, IPlaylistDetailed } from "./playlist.model";
import { ISong } from "./song.model";

export interface IUserSmall {
  username: string;
  id: string;
  imgUrl?: string;
  isAdmin?: boolean;
}
export interface IUser extends IUserSmall {
  email: string;
  playlists: IPlaylist[];
  songs: ISong[];
}

// DTO
export interface IFullUserDTO extends IUserSmall {
  email: string;
  friends: IFriend[];
  friendsRequest: IFriend[];
  likedSongsPlaylist: IPlaylistDetailed;
  playlists: IPlaylistDetailed[];
  password?: string;
}
export interface IUserDTO {
  email?: string;
  password?: string;
  username?: string;
  imgUrl?: string;
}

//Redux

export const SET_USER = "SET_USER";
export interface IUserState {
  user: IUserSmall | null;
}
export interface IUserAction {
  type: TUserActionType;
  payload: IUserSmall | null;
}
export type TUserActionType = typeof SET_USER;
