import {
  IUser,
  IUserAction,
  IUserCreateDTO,
  IUserLoginDTO,
} from "../../models/user.model";
import { userService } from "../../services/user.service";
import { store } from "../store";

export const setUser = (user: IUser | null): IUserAction => ({
  type: "SET_USER",
  payload: user,
});

export const login = async (userLogin: IUserLoginDTO): Promise<void> => {
  try {
    const user = await userService.login(userLogin);
    store.dispatch(setUser(user));
    return;
  } catch (error) {
    console.error(`Error while logging in: ${error}`);
    return;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await userService.logout();
    store.dispatch(setUser(null));
    return;
  } catch (error) {
    console.error(`Error while logging out: ${error}`);
    return;
  }
};

export const signup = async (userToCreate: IUserCreateDTO): Promise<void> => {
  try {
    const user = await userService.signup(userToCreate);
    store.dispatch(setUser(user));
    return;
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
    return;
  }
};
