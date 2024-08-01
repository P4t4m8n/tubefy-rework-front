import { IPlaylist } from "./playlist.model";

export interface IUserSmall {
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
  email: string;
  id: string;
}

export interface IUserDTO extends IUserSmall {
  password?: string;
}

export interface IUser extends IUserSmall {
  playlists: IPlaylist[];
  favorites: IPlaylist[];
  LikedSongs: IPlaylist;
  friends: IUserSmall[];
}
