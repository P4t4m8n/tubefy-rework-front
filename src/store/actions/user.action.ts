import {
  IUserAction,
  IUserCreateDTO,
  IUserLoginDTO,
  IUserSmall,
} from "../../models/user.model";
import { userService } from "../../services/user.service";
// import { userFormValidation } from "../../validations/auth";
import { store } from "../store";

export const setUser = (user: IUserSmall | null): IUserAction => ({
  type: "SET_USER",
  payload: user,
});

export const login = async (userLogin: IUserLoginDTO): Promise<void> => {
  try {
    // const parsedUser = userFormValidation.loginFormSchema.parse(userLogin);
    // if (!parsedUser) {
    //   console.error(`Error while parsing user: ${parsedUser}`);
    //   return;
    // }
    const user = await userService.login(userLogin);
    store.dispatch(setUser(user));
    return;
  } catch (error) {
    console.error(`Error while logging in: ${error}`);
    return;
  }
};

export const signup = async (userToCreate: IUserCreateDTO): Promise<void> => {
  try {
    // const parsedUser = userFormValidation.signupFormSchema.parse(userToCreate);
    // if (!parsedUser) {
    //   console.error(`Error while parsing user: ${parsedUser}`);
    //   return;
    // }
    const user = await userService.signup(userToCreate);
    store.dispatch(setUser(user));
    return;
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
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
