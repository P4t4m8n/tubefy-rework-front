import { TSessionDataKeys } from "../models/app.model";
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

const logout = async (): Promise<void> => {
  await httpService.post<boolean>(BASE_URL + "logout");
  removeSessionData();
  return;
};

const signup = async (userCreateDTO: IUserDTO): Promise<IFullUserDTO> => {
  const fullUser = await httpService.post<IFullUserDTO>(
    BASE_URL + "signup",
    userCreateDTO
  );
  return fullUser;
};

const removeSessionData = (): void => {
  try {
    Object.keys(localStorage).forEach((key) => {
      console.log("key:", key)
      storeSessionData(key as TSessionDataKeys);
    });
  } catch (error) {
    throw new Error(`Failed to remove session data: ${error}`);
  }
};

export const authService = { login, logout, signup };
