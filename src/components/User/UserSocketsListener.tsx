import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { TNotificationStatus } from "../../models/app.model";
import { IFriend } from "../../models/friend.model";
import { IPlaylist } from "../../models/playlist.model";
import { TSocketEvent } from "../../models/socket.model";
import { IUser } from "../../models/user.model";
import { showUserMsg } from "../../services/eventEmitter";
import { socketService } from "../../services/socket.service";
import {
  addFriendRequest,
  handleIncomingFriendsUpdate,
} from "../../store/actions/friend.action";

export default function UserSocketsListener({ user }: { user: IUser | null }) {
  useEffectUpdate(() => {
    const handleSocketEvent = (
      eventName: TSocketEvent,
      data: IFriend | IPlaylist | string | Partial<IFriend>
    ) => {
      switch (eventName) {
        case "sendFriendRequest":
          addFriendRequest(data as IFriend);
          showSuccessMsg(data as IFriend, " sent you a friend request");
          break;
        case "sharePlaylist":
          //TODO implement sharePlaylist
          break;
        case "approveFriendRequest":
          handleIncomingFriendsUpdate(data as IFriend);
          showSuccessMsg(data as IFriend, " accepted your friend request");
          break;
        case "rejectFriendRequest":
        case "blockFriendRequest":
          handleIncomingFriendsUpdate(data as IFriend);
          showSuccessMsg(
            data as IFriend,
            " rejected your friend request",
            "error"
          );
          break;
        case "removeFriendRequest":
          handleIncomingFriendsUpdate((data as Partial<IFriend>).id!);
          showSuccessMsg(
            data as Partial<IFriend>,
            " removed you from their friends list",
            "error"
          );
          break;
        default:
          console.warn(`Unhandled socket event: ${eventName}`);
          break;
      }
    };

    const socket = socketService.get();
    socket?.onAny(handleSocketEvent);

    return () => {
      socket?.offAny(handleSocketEvent);
    };
  }, [user]);

  const showSuccessMsg = (
    data: Partial<IFriend>,
    text: string,
    status: TNotificationStatus = "success"
  ) => {
    showUserMsg({
      text: `${data.friend?.username}${text}!`,
      status,
      type: "friend",
      link: "/profile/friends",
      imgUrl: data.friend?.imgUrl,
    });
  };
  return null;
}
