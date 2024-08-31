import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import FriendsList from "./FriendsList";
import { IModelAction } from "../../../models/app.model";
import { DeleteSVG } from "../../svg/SVGs";

export default function ProfileFriendList() {
  const friends = useAppSelector((state) => state.friends.friends);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onRemoveFriend = (_ev: React.MouseEvent, _friendId: string) => {
    //TODO: implement remove friend
  };

  const modelActions: IModelAction<string>[] = useMemo(
    () => [
      {
        text: "Add Friend",
        action: (ev, friendId) => {
          onRemoveFriend(ev, friendId);
        },
        icon: <DeleteSVG />,
      },
    ],
    []
  );

  return (
    <FriendsList
      modelActions={modelActions}
      friendList={friends}
      title="Friends"
    ></FriendsList>
  );
}
