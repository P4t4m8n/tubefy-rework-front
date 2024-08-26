import {
  IFriendAction,
  IFriendBulkAction,
  IFriendState,
  SET_FRIENDS,
  SET_FRIENDS_BULK,
  SET_FRIENDS_REQUEST,
} from "../../models/friend.model";

const initialState: IFriendState = {
  friends: [],
  friendsRequest: [],
};

export const friendReducer = (
  state = initialState,
  action: IFriendAction | IFriendBulkAction
): IFriendState => {
  switch (action.type) {
    case SET_FRIENDS:
      return { ...state, friends: action.payload };
    case SET_FRIENDS_REQUEST:
      return { ...state, friendsRequest: action.payload };
    case SET_FRIENDS_BULK:
      return {
        ...state,
        friends: action.payload.friends,
        friendsRequest: action.payload.friendsRequest,
      };
    default:
      return state;
  }
};
