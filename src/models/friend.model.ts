import { IUserSmall } from "./user.model";

//Interfaces
export interface IFriend {
  id?: string;
  status: TFriendStatus;
  createdAt: string;
  friend: IUserSmall;
}

//DTOs
export interface IFriendDTO {
  userId: string;
  id?: string;
  friendId: string;
  status: TFriendStatus;
}

//Types
export type TFriendStatus = "PENDING" | "ACCEPTED" | "BLOCKED" | "REJECTED";

//Redux
export const SET_FRIENDS = "SET_FRIENDS";
export const SET_FRIENDS_REQUEST = "SET_FRIENDS_REQUEST";
export const SET_FRIENDS_BULK = "SET_FRIENDS_BULK";
export interface IFriendState {
  friends: IFriend[];
  friendsRequest: IFriend[];
}
export interface IFriendAction {
  type: TFriendActionType;
  payload: IFriend[];
}
export interface IFriendBulkAction {
  type: typeof SET_FRIENDS_BULK;
  payload: {
    friends: IFriend[];
    friendsRequest: IFriend[];
  };
}
export type TFriendActionType = typeof SET_FRIENDS | typeof SET_FRIENDS_REQUEST;
