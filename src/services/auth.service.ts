import { IPlaylistDetailed } from "../models/playlist.model";
import { IFullUserDTO, IUser, IUserDTO } from "../models/user.model";
import { httpService } from "./http.service";
import { storeSessionData } from "./localSession.service";

const BASE_URL = "auth/";

const login = async (userCreateDTO: IUserDTO): Promise<IFullUserDTO> => {
  const fullUser = await httpService.post<IFullUserDTO>(
    BASE_URL + "login",
    userCreateDTO
  );
  console.log("fullUser:", fullUser);
  _setSessionData(fullUser);
  return fullUser;
};

const logout = async (): Promise<boolean> => {
  const isDeleted = await httpService.post<boolean>(BASE_URL + "logout");
  _setSessionData();
  return isDeleted;
};

const signup = async (userCreateDTO: IUserDTO): Promise<IFullUserDTO> => {
  const fullUser = await httpService.post<IFullUserDTO>(
    BASE_URL + "signup",
    userCreateDTO
  );
  _setSessionData(fullUser);
  return fullUser;
};

const _setSessionData = (fullUser?: IFullUserDTO): void => {
  storeSessionData<IUser>("user", fullUser?.user);
  storeSessionData<IPlaylistDetailed[]>("playlists", fullUser?.playlists);
  storeSessionData<IPlaylistDetailed>(
    "likedPlaylist",
    fullUser?.likedSongsPlaylist
  );
  if (!fullUser) {
    storeSessionData("friends");
    storeSessionData("friendRequests");
    storeSessionData("notifications");
  }
};

export const authService = { login, logout, signup };
