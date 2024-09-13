import { useEffectUpdate } from "../../hooks/useEffectUpdate";

import { INotification } from "../../models/notification.model";
import { TSocketEvent } from "../../models/socket.model";
import { IUser } from "../../models/user.model";

import { socketService } from "../../services/socket.service";

import {
  addFriendRequest,
  handleIncomingFriendsUpdate,
} from "../../store/actions/friend.action";
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
        case "sendFriendRequest":
          addFriendRequest(data);
          break;
        case "sharePlaylist":
          addNotification(data);
          break;

        case "addSongToPlaylist":
          addSongFromSocket(data.playlist?.id, data?.song);
          utilService.handleNotificationMsg(data);
          break;

        case "approveFriendRequest":
        case "rejectFriendRequest":
        case "removeFriendRequest":
        case "blockFriendRequest":
          handleIncomingFriendsUpdate(data);
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

  return null;
}
