import {
  IFriend,
  IFriendAction,
  SET_FRIENDS,
  SET_FRIENDS_BULK,
  SET_FRIENDS_REQUEST,
  TFriendStatus,
} from "../../models/friend.model";
import { showUserMsg } from "../../services/eventEmitter";
import { friendsService } from "../../services/friends.service";
import {
  getSessionData,
  storeSessionData,
} from "../../services/localSession.service";
import { store } from "../store";

const setFriends = (friends: IFriend[]): IFriendAction => ({
  type: SET_FRIENDS,
  payload: friends,
});

const setFriendsRequests = (friends: IFriend[]): IFriendAction => ({
  type: SET_FRIENDS_REQUEST,
  payload: friends,
});

const setFriendsBulk = (friends: IFriend[], friendsRequest: IFriend[]) => ({
  type: SET_FRIENDS_BULK,
  payload: { friends, friendsRequest },
});

export const loadFriendsBulk = (
  friends: IFriend[],
  friendsRequest: IFriend[]
) => {
  try {
    store.dispatch(setFriendsBulk(friends, friendsRequest));
  } catch (error) {
    console.error("Error in loading friends bulk -> friend.action", error);
    showUserMsg({
      text: "Error in loading friends bulk",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const loadFriends = (friends: IFriend[]) => {
  try {
    store.dispatch(setFriends(friends));
  } catch (error) {
    console.error("Error in loading friends -> friend.action", error);
    showUserMsg({
      text: "Error in loading friends",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const loadFriendsRequests = (friends: IFriend[]) => {
  try {
    store.dispatch(setFriendsRequests(friends));
  } catch (error) {
    console.error("Error in loading friends requests -> friend.action", error);
    showUserMsg({
      text: "Error in loading friends requests",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const addFriendRequest = (friend: IFriend) => {
  try {
    const friendsRequest = [...store.getState().friends.friendsRequest];
    friendsRequest.push(friend);
    storeSessionData("friendRequests", friendsRequest);
    store.dispatch(setFriendsRequests(friendsRequest));
  } catch (error) {
    console.error("Error in adding friend request -> friend.action", error);
    showUserMsg({
      text: "Error in adding friend request",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const addFriend = async (friendId: string) => {
  try {
    const friend = await friendsService.create(friendId);
    const friends = [...store.getState().friends.friends];

    friends.push(friend);
    storeSessionData("friends", friends);
    store.dispatch(setFriends(friends));
  } catch (error) {
    console.error("Error in adding friend -> friend.action", error);
    showUserMsg({
      text: "Error in adding friend",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const updateFriend = async (friend: IFriend, status: TFriendStatus) => {
  try {
    const _friend = { ...friend, status };
    const updatedFriend = await friendsService.update(_friend);

    const friendsRequest = <IFriend[]>getSessionData("friendRequests") || [];
    const friends = <IFriend[]>getSessionData("friends") || [];

    const idx = friends.findIndex((f) => f.id === updatedFriend.id);
    friendsRequest.splice(idx, 1);
    friends.push(updatedFriend);

    storeSessionData("friends", friends);
    storeSessionData("friendRequests", friendsRequest);

    store.dispatch(setFriendsBulk(friends, friendsRequest));
  } catch (error) {
    console.error("Error in updating friend -> friend.action", error);
    showUserMsg({
      text: "Error in updating friend",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};

export const friendRequestApproved = (friend: IFriend) => {
  try {
    const friends = <IFriend[]>getSessionData("friends") || [];

    const idx = friends.findIndex((f) => f.id === friend.id);
    friends.splice(idx, 1, friend);

    storeSessionData("friends", friends);

    store.dispatch(setFriends(friends));
  } catch (error) {
    console.error("Error in approving friend request -> friend.action", error);
    showUserMsg({
      text: "Error in approving friend request",
      type: "general-error",
      status: "error",
      imgUrl: "/error-img.jpg",
    });
  }
};
