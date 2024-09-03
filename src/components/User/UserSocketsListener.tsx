import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import {
  INotification,
  INotificationProps,
} from "../../models/notification.model";
import { TSocketEvent } from "../../models/socket.model";
import { IUser } from "../../models/user.model";
import { showUserMsg } from "../../services/eventEmitter";
import { socketService } from "../../services/socket.service";
import { addNotification } from "../../store/actions/notification.action";
import { addSongFromSocket } from "../../store/actions/playlist.action";
import { utilService } from "../../util/util.util";

export default function UserSocketsListener({ user }: { user: IUser | null }) {
  useEffectUpdate(() => {
    const handleSocketEvent = (
      eventName: TSocketEvent,
      data: INotification
    ) => {
     
      switch (eventName) {
        // case "sendFriendRequest":
        //   addFriendRequest(data as IFriend);
        //   showSuccessMsg(data as IFriend, " sent you a friend request");
        //   break;
        case "sharePlaylist":
          addNotification(data);
          showSuccessMsg({
            ...data,
            status: "success",
            imgUrl: data.imgUrl,
          });
          break;

        case "addSongToPlaylist":
          addSongFromSocket(data.playlist?.id, data?.song);
          utilService.handleSocketMsg(data);
          break;
        // case "approveFriendRequest":
        //   handleIncomingFriendsUpdate(data as IFriend);
        //   showSuccessMsg(data as IFriend, " accepted your friend request");
        //   break;
        // case "rejectFriendRequest":
        // case "blockFriendRequest":
        //   handleIncomingFriendsUpdate(data as IFriend);
        //   showSuccessMsg(
        //     data as IFriend,
        //     " rejected your friend request",
        //     "error"
        //   );
        //   break;
        // case "removeFriendRequest":
        //   handleIncomingFriendsUpdate((data as Partial<IFriend>).id!);
        //   showSuccessMsg(
        //     data as Partial<IFriend>,
        //     " removed you from their friends list",
        //     "error"
        //   );
        //   break;
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

  const showSuccessMsg = (notification: INotificationProps) => {
    const { text, fromUser } = notification;
    showUserMsg({
      ...notification,
      text: `${fromUser?.username || ""}${text}!`,
    });
  };
  return null;
}
