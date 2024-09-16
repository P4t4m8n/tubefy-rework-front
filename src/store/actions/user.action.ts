import {
  IFullUserDTO,
  IUser,
  IUserAction,
  IUserDTO,
} from "../../models/user.model";
import { socketService } from "../../services/socket.service";
import { authService } from "../../services/auth.service";
import { store } from "../store";
import { loadUserPlaylists } from "./playlist.action";
import { loadFriendsBulk } from "./friend.action";
import { loadNotifications } from "./notification.action";
import { utilService } from "../../util/util.util";
import { storeSessionData } from "../../services/localSession.service";
import { userService } from "../../services/user.service";

export const login = async (userLogin: IUserDTO): Promise<void> => {
  try {
    const fullUser = await authService.login(userLogin);

    _handleUser(fullUser);

    utilService.handleSuccess(
      `Welcome back ${fullUser.user.username}`,
      "WELCOME",
      "/welcome-img.jpg"
    );

    return;
  } catch (error) {
    _handleAuthError(error);
  }
};

export const signup = async (userToCreate: IUserDTO): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fullUser = await authService.signup(userToCreate);
    _handleUser(fullUser);

    utilService.handleSuccess(
      `Welcome ${fullUser.user.username}`,
      "WELCOME",
      "/welcome-img.jpg"
    );
    return;
  } catch (error) {
    _handleAuthError(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await authService.logout();
    socketService.disconnect();
    loadNotifications([]);
    store.dispatch(_setUser(null));

    utilService.handleSuccess("Goodbye!", "GOODBYE", "/goodbye-img.jpg");

    return;
  } catch (error) {
    utilService.handleError(
      "Failed to logout",
      "GENERAL_ERROR",
      error as Error
    );
    return;
  }
};

export const updateUser = async (user: IUserDTO): Promise<void> => {
  try {
    const updatedUser = await userService.update(user);
    console.log("updatedUser:", updatedUser)
    store.dispatch(_setUser(updatedUser));
    return;
  } catch (error) {
    utilService.handleError(
      "Failed to update user",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const _handleUser = (fullUser: IFullUserDTO): void => {
  try {
    _handleUserData(fullUser);
    _handleUserSession(fullUser.user);
  } catch (error) {
    utilService.handleError(
      "Failed to handle user",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const _handleUserData = (fullUser: IFullUserDTO): void => {
  loadUserPlaylists(fullUser.playlists, fullUser.likedSongsPlaylist);
  loadFriendsBulk(fullUser.friends, fullUser.friendsRequest);
  loadNotifications(fullUser.notifications);
};

const _handleUserSession = (user: IUser): void => {
  storeSessionData("user", user);
  socketService.connect();
  store.dispatch(_setUser(user));
};

const _setUser = (user: IUser | null): IUserAction => ({
  type: "SET_USER",
  payload: user,
});

const _handleAuthError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.cause === 409) {
      throw new Error(error.message, { cause: 409 });
    }
  }
  utilService.handleError("Failed to signup", "GENERAL_ERROR", error as Error);
};
