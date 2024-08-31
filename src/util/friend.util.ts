import { IFriend, IFriendDTO } from "../models/friend.model";

export const friendToFriendDTO = (friend: IFriend): IFriendDTO => {
  return {
    id: friend.id,
    userId: friend.friend.id,
    friendId: friend.friend.id,
    status: friend.status,
  };
};


