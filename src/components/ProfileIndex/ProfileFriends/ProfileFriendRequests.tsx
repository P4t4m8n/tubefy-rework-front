import { MouseEvent, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import FriendsList from "./FriendsList";
import { IModelAction } from "../../../models/app.model";
import { IFriend, TFriendStatus } from "../../../models/friend.model";
import { MessageSVG } from "../../svg/SVGs";
import { updateFriend } from "../../../store/actions/friend.action";

export default function ProfileFriendRequests() {
  const friendsRequest = useAppSelector(
    (state) => state.friends.friendsRequest
  );

  const onUpdateFriendStatus = useCallback(
    async (ev: MouseEvent, friend: IFriend, status: TFriendStatus) => {
      await updateFriend(friend, status);
    },
    []
  );

  const friendStatus: TFriendStatus[] = ["ACCEPTED", "REJECTED", "BLOCKED"];

  const modelActions: IModelAction<IFriend>[] = friendStatus.map((status) => ({
    text: status,
    action: (ev: MouseEvent, friend: IFriend) =>
      onUpdateFriendStatus(ev, friend, status),
    icon: <div className={`${status}`}></div>,
  }));

  modelActions.push({
    text: "MESSAGE",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: (_ev: MouseEvent, _friend: IFriend) => {
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
