import { useCallback } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import FriendsList from "./FriendsList";
import { IModelAction } from "../../../models/app.model";
import { IFriend, TFriendStatus } from "../../../models/friend.model";
import { MessageSVG } from "../../svg/SVGs";
import { handleFriendRequestActions } from "../../../store/actions/friend.action";

export default function ProfileFriendRequests() {
  const friendsRequest = useAppSelector(
    (state) => state.friends.friendsRequest
  );

  const onUpdateFriendStatus = useCallback(
    async (friend: IFriend, status: TFriendStatus) => {
      await handleFriendRequestActions(friend, status);
    },
    []
  );

  const friendStatus: TFriendStatus[] = ["ACCEPTED", "REJECTED", "BLOCKED"];

  const modelActions: IModelAction<IFriend>[] = friendStatus.map((status) => ({
    text: status,
    action: (friend: IFriend) => onUpdateFriendStatus(friend, status),
    icon: <div className={`${status}`}></div>,
  }));

  modelActions.push({
    text: "MESSAGE",
    action: (friend: IFriend) => {
      console.log("friend:", friend)
      //TODO: implement message
    },
    icon: <MessageSVG />,
  });

  return (
    <FriendsList
      modelActions={modelActions}
      friendList={friendsRequest}
      title="Friends Requests"
    ></FriendsList>
  );
}
