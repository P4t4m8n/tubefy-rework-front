import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import FriendsList from "./FriendsList";
import { IModelAction } from "../../../models/app.model";
import { DeleteSVG, MessageSVG } from "../../svg/SVGs";
import { IFriend } from "../../../models/friend.model";
import { removeFriend } from "../../../store/actions/friend.action";
import { showUserMsg } from "../../../services/eventEmitter";

export default function ProfileFriendList() {
  const friends = useAppSelector((state) => state.friends.friends);

  const onRemoveFriend = useCallback(async (friend: IFriend) => {
    await removeFriend(friend);

    showUserMsg({
      text: `${friend.friend.username} was removed"`,
      type: "FRIEND_REMOVED",
      status: "success",
    });
  }, []);

  const modelActions: IModelAction<IFriend>[] = useMemo(
    () => [
      {
        text: "REMOVE",
        action: (friend: IFriend) => {
          onRemoveFriend(friend);
        },
        icon: <DeleteSVG />,
      },
      {
        text: "MESSAGE",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        action: () => {
          //TODO: implement message
        },
        icon: <MessageSVG />,
      },
    ],
    [onRemoveFriend]
  );

  return (
    <FriendsList
      modelActions={modelActions}
      friendList={friends}
      title="Friends"
    ></FriendsList>
  );
}
