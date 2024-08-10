import {
  IUserCreateDTO,
  IUserLoginDTO,
  IUserSmall,
} from "../models/user.model";
import { httpService } from "./http.service";

const STORAGE_KEY = "loggedInUser";
const BASE_URL = "auth/";

const getLoggedinUser = (): null | IUserSmall => {
  const session = sessionStorage.getItem(STORAGE_KEY);
  if (!session) {
    return null;
  }
  return JSON.parse(session);
};

const login = async (userCreateDTO: IUserLoginDTO): Promise<IUserSmall> => {
  const user = await httpService.post<IUserSmall>(
    BASE_URL + "login",
    userCreateDTO
  );
  _setLoggedInUser(user);
  return user;
};

const logout = async (): Promise<boolean> => {
  sessionStorage.removeItem(STORAGE_KEY);
  _setLoggedInUser();
  return httpService.post<boolean>(BASE_URL + "logout");
};

const signup = async (userCreateDTO: IUserCreateDTO): Promise<IUserSmall> => {
  const user = await httpService.post<IUserSmall>(
    BASE_URL + "signup",
    userCreateDTO
  );
  _setLoggedInUser(user);
  return user;
};

const _setLoggedInUser = (user?: IUserSmall) => {
  if (user) {
    return sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  sessionStorage.removeItem(STORAGE_KEY);
};
export const userService = { getLoggedinUser, login, logout, signup };
