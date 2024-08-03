import { IUser } from "../models/user.model";

const STORAGE_KEY = "loggedInUser";

const getLoggedinUser = (): null | IUser => {
  const session = sessionStorage.getItem(STORAGE_KEY);
  if (!session) {
    return null;
  }
  return JSON.parse(session);
};
export const userService = { getLoggedinUser };
