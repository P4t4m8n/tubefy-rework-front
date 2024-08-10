import { IPlaylist } from "./playlist.model";

export interface IUserSmall {
  username: string;
  id: string;
  imgUrl?: string;
  isAdmin?: boolean;
}
export interface IUserCreateDTO extends IUserLoginDTO {
  username: string;
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
  user: IUserSmall | null;
}
export interface IUserAction {
  type: TUserActionType;
  payload: IUserSmall | null;
}

export type TUserActionType = "SET_USER" | "EDIT_USER";
