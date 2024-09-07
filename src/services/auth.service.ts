import { IFullUserDTO, IUserDTO } from "../models/user.model";
import { httpService } from "./http.service";
import { storeSessionData } from "./localSession.service";

const BASE_URL = "auth/";

const login = async (userCreateDTO: IUserDTO): Promise<IFullUserDTO> => {
  return await httpService.post<IFullUserDTO>(
    BASE_URL + "login",
    userCreateDTO
  );
};

const logout = async (): Promise<boolean> => {
  return await httpService.post<boolean>(BASE_URL + "logout");
};

const signup = async (userCreateDTO: IUserDTO): Promise<IFullUserDTO> => {
  const fullUser = await httpService.post<IFullUserDTO>(
    BASE_URL + "signup",
    userCreateDTO
  );
  removeSessionData();
  return fullUser;
};

const removeSessionData = (): void => {
  try {
    storeSessionData("user");
    storeSessionData("playlists");
    storeSessionData("likedPlaylist");
    storeSessionData("friends");
    storeSessionData("friendRequests");
    storeSessionData("notifications");
  } catch (error) {
    throw new Error(`Failed to remove session data: ${error}`);
  }
};

export const authService = { login, logout, signup };
