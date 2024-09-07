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
import { showUserMsg } from "../../services/eventEmitter";
import { loadNotifications } from "./notification.action";
import { utilService } from "../../util/util.util";
import { storeSessionData } from "../../services/localSession.service";

const setUser = (user: IUser | null): IUserAction => ({
  type: "SET_USER",
  payload: user,
});

//TODO add validation
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
    console.error(`Error while logging in: ${error}`);
    utilService.handleError("Failed to login", "GENERAL_ERROR", error as Error);
    return;
  }
};

//TODO add validation
export const signup = async (userToCreate: IUserDTO): Promise<void> => {
  try {
    const fullUser = await authService.signup(userToCreate);
    _handleUser(fullUser);

    utilService.handleSuccess(
      `Welcome ${fullUser.user.username}`,
      "WELCOME",
      "/welcome-img.jpg"
    );
    return;
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
    showUserMsg({
      text: "Failed to sign up",
      type: "GENERAL_ERROR",
      status: "error",
      imgUrl: "/error-img.png",
    });

    return;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await authService.logout();
    socketService.disconnect();
    store.dispatch(setUser(null));

    utilService.handleSuccess("Logged out", "GOODBYE", "/goodbye-img.jpg");

    return;
  } catch (error) {
    console.error(`Error while logging out: ${error}`);
    utilService.handleError(
      "Failed to logout",
      "GENERAL_ERROR",
      error as Error
    );
    return;
  }
};

const _handleUser = (fullUser: IFullUserDTO): void => {
  try {
    const {
      playlists,
      friends,
      friendsRequest,
      likedSongsPlaylist,
      user,
      notifications,
    } = fullUser;

    loadUserPlaylists(playlists, likedSongsPlaylist);
    loadFriendsBulk(friends, friendsRequest);
    loadNotifications(notifications);
    storeSessionData("user", user);

    socketService.connect();
    store.dispatch(setUser(user));
  } catch (error) {
    utilService.handleError(
      "Failed to handle user",
      "GENERAL_ERROR",
      error as Error
    );
  }
};
