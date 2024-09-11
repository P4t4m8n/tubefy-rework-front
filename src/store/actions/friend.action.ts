import {
  IFriend,
  IFriendAction,
  TFriendStatus,
  SET_FRIENDS,
  SET_FRIENDS_BULK,
  SET_FRIENDS_REQUEST,
} from "../../models/friend.model";
import { INotification } from "../../models/notification.model";
import { friendsService } from "../../services/friends.service";
import { storeSessionData } from "../../services/localSession.service";
import { utilService } from "../../util/util.util";
import { store } from "../store";
import { addNotification } from "./notification.action";

export const loadFriendsBulk = (
  friends: IFriend[],
  friendsRequest: IFriend[]
) => {
  try {
    updateState(friends, friendsRequest);
  } catch (error) {
    utilService.handleError(
      "loading friends bulk -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const addFriend = async (friendId: string) => {
  try {
    const notification = await friendsService.create(friendId);
    const { friend } = notification;
    if (!friend) {
      throw new Error("Friend data is missing");
    }
    const friends = [...store.getState().friends.friends, friend];
    updateFriends(friends);
    addNotification(notification);
  } catch (error) {
    utilService.handleError(
      "Unable to add friend",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const removeFriend = async (friend: IFriend) => {
  try {
    const { id } = friend;

    const friendId = friend.friend.id;

    if (!id) {
      throw new Error("Friend id is missing");
    }

    await friendsService.remove(id, friendId);
    const friends = store.getState().friends.friends.filter((f) => f.id !== id);

    updateFriends(friends);
  } catch (error) {
    utilService.handleError(
      "removing friend -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const handleIncomingFriendsUpdate = (notification: INotification) => {
  try {
    const { friend } = notification;
    if (!friend || !friend?.id) {
      throw new Error("Friend data is missing");
    }

    if (
      notification.type === "FRIEND_REJECTED" ||
      notification.type === "FRIEND_BLOCKED" ||
      notification.type === "FRIEND_REMOVED"
    ) {
      removeFriendRequest(friend.id);
      addNotification(notification);
      return;
    }

    const friends = store.getState().friends.friends;
    const updatedFriends = friends.map((_friend) =>
      _friend.id === friend.id ? friend : _friend
    );

    updateFriends(updatedFriends);
    addNotification(notification);
  } catch (error) {
    utilService.handleError(
      "handling incoming friends update -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const handleFriendRequestActions = async (
  friend: IFriend,
  status: TFriendStatus
) => {
  try {
    const _friend = { ...friend, status };
    const notification = await friendsService.update(_friend);
    const { friend: updatedFriend } = notification;

    if (!updatedFriend) {
      throw new Error("Friend data is missing");
    }

    switch (status) {
      case "ACCEPTED":
        approveFriendRequest(updatedFriend);
        break;
      case "REJECTED":
      case "BLOCKED":
        rejectFriendRequest(updatedFriend);
        break;
      default:
        break;
    }
    utilService.handleNotificationMsg(notification);
  } catch (error) {
    utilService.handleError(
      "handling friend request actions -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const addFriendRequest = (notification: INotification) => {
  try {
    const { friend } = notification;
    if (!friend) {
      console.error("No friend data");
      return;
    }
    const friendsRequest = [...store.getState().friends.friendsRequest, friend];
    updateFriendsRequest(friendsRequest);
    addNotification(notification);
  } catch (error) {
    utilService.handleError(
      "Error incoming friend request",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const removeFriendRequest = (friendId: string) => {
  try {
    const idx = store
      .getState()
      .friends.friendsRequest.findIndex((f) => f.id === friendId);

    if (idx > -1) {
      const friendsRequest = store
        .getState()
        .friends.friendsRequest.filter((f) => f.id !== friendId);
      updateFriendsRequest(friendsRequest);
      return;
    }
    const friends = store
      .getState()
      .friends.friends.filter((f) => f.id !== friendId);
    updateFriends(friends);
  } catch (error) {
    utilService.handleError(
      "removing friend request -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const approveFriendRequest = (friend: IFriend) => {
  try {
    const state = store.getState().friends;
    const friendsRequest = state.friendsRequest.filter(
      (f) => f.id !== friend.id
    );
    const friends = [...state.friends, friend];

    updateState(friends, friendsRequest);
  } catch (error) {
    utilService.handleError(
      "approving friend request -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const rejectFriendRequest = (friend: IFriend) => {
  try {
    const friendsRequest = store
      .getState()
      .friends.friendsRequest.map((f) => (f.id !== friend.id ? f : friend));

    updateFriendsRequest(friendsRequest);
  } catch (error) {
    utilService.handleError(
      "rejecting friend request -> friend.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const updateState = (friends: IFriend[], friendsRequest: IFriend[]) => {
  storeSessionData("friends", friends);
  storeSessionData("friendRequests", friendsRequest);
  store.dispatch(setFriendsBulk(friends, friendsRequest));
};

const updateFriends = (friends: IFriend[]) => {
  storeSessionData("friends", friends);
  store.dispatch(setFriends(friends));
};

const updateFriendsRequest = (friendsRequest: IFriend[]) => {
  storeSessionData("friendRequests", friendsRequest);
  store.dispatch(setFriendsRequests(friendsRequest));
};

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
