import { IUser, IUserAction, IUserDTO } from "../../models/user.model";
import { socketService } from "../../services/socket.service";
import { userService } from "../../services/auth.service";
import { store } from "../store";
import { loadUserPlaylists } from "./playlist.action";
import { loadFriendsBulk } from "./friend.action";
import { showUserMsg } from "../../services/eventEmitter";

const setUser = (user: IUser | null): IUserAction => ({
  type: "SET_USER",
  payload: user,
});

//TODO add validation
export const login = async (userLogin: IUserDTO): Promise<void> => {
  try {
    const fullUser = await userService.login(userLogin);

    const { playlists, friends, friendsRequest, likedSongsPlaylist, user } =
      fullUser;

    loadUserPlaylists(playlists, likedSongsPlaylist);
    loadFriendsBulk(friends, friendsRequest);
    socketService.connect();
    store.dispatch(setUser(user));
    showUserMsg({
      text: `Welcome back ${user.username}`,
      type: "welcome",
      status: "success",
      imgUrl: "/welcome-img.jpg",
    });
    return;
  } catch (error) {
    console.error(`Error while logging in: ${error}`);
    showUserMsg({
      text: "Failed to logging in",
      type: "general-error",
      status: "error",
      imgUrl: "error-img.png",
    });
    return;
  }
};

//TODO add validation
export const signup = async (userToCreate: IUserDTO): Promise<void> => {
  try {
    const fullUser = await userService.signup(userToCreate);
    const { playlists, friends, friendsRequest, likedSongsPlaylist, user } =
      fullUser;

    loadUserPlaylists(playlists, likedSongsPlaylist);
    loadFriendsBulk(friends, friendsRequest);
    socketService.connect();
    store.dispatch(setUser(user));
    showUserMsg({
      text: `Welcome ${user.username}`,
      type: "welcome",
      status: "success",
      imgUrl: "/welcome-img.jpg",
    });
    return;
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
    showUserMsg({
      text: "Failed to sign up",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.png",
    });

    return;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await userService.logout();
    socketService.disconnect();
    store.dispatch(setUser(null));
    showUserMsg({
      text: `Goodbye`,
      type: "goodbye",
      status: "success",
      imgUrl: "/goodbye-img.jpg",
    });
    return;
  } catch (error) {
    console.error(`Error while logging out: ${error}`);
    showUserMsg({
      text: "Failed to logout",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.png",
    });
    return;
  }
};
