import {
  IFriend,
  IFriendAction,
  SET_FRIENDS,
  SET_FRIENDS_BULK,
  SET_FRIENDS_REQUEST,
} from "../../models/friend.model";
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
  friendSRequest: IFriend[]
) => {
  store.dispatch(setFriendsBulk(friends, friendSRequest));
};

export const loadFriends = (friends: IFriend[]) => {
  store.dispatch(setFriends(friends));
};

export const loadFriendsRequests = (friends: IFriend[]) => {
  store.dispatch(setFriendsRequests(friends));
};
