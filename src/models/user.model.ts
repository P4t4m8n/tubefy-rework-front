import { IPlaylist } from "./playlist.model";

export interface IUserSmall {
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
  email: string;
  id: string;
}

export interface IUserCreateDTO extends IUserSmall {
  password?: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUser extends IUserSmall {
  playlists: IPlaylist[];
  favorites: IPlaylist[];
  LikedSongs: IPlaylist;
  friends: IUserSmall[];
}

export interface IUserState {
  user: IUser | null;
}

export interface IUserAction {
  type: TUserActionType;
  payload: IUser | null;
}

export type TUserActionType = "SET_USER" | "EDIT_USER";
