import { useRef, useState } from "react";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { eventBus, SHOW_MSG } from "../../services/eventEmitter";
import { INotification } from "../../models/app.model";
import { socketService } from "../../services/socket.service";
import { TSocketEvent } from "../../models/socket.model";
import {
  addFriendRequest,
  friendRequestApproved,
} from "../../store/actions/friend.action";
import { IFriend } from "../../models/friend.model";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";

export default function UserMsg() {
  const [msg, setMsg] = useState<INotification | null>(null);
  const user = useAppSelector((state) => state.user.user);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffectUpdate(() => {
    const unsubscribe = eventBus.on(SHOW_MSG, (notification: INotification) => {
      setMsg(notification);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000);
    });

    return () => {
      unsubscribe();
    };
  }, [msg]);

  useEffectUpdate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSocketEvent = (eventName: TSocketEvent, data: any) => {
      switch (eventName) {
        case "sendFriendRequest":
          addFriendRequest(data);
          setMsg({
            text: `${
              (data as IFriend).friend.username
            } sent you a friend request!`,
            status: "success",
            type: "friend",
            link: "/profile/friends",
          });

          break;
        case "sharePlaylist":
          //TODO implement sharePlaylist
          break;
        case "approveFriendRequest":
          friendRequestApproved(data);
          setMsg({
            text: `${
              (data as IFriend).friend.username
            } accepted your friend request!`,
            status: "success",
            type: "friend",
            link: "/profile/friends",
          });
          break;
        case "rejectFriendRequest":
          //TODO implement rejectFriendRequest
          break;
        default:
          console.warn(`Unhandled socket event: ${eventName}`);
      }
    };

    // Listen to all socket events using socket.onAny
    const socket = socketService.get();
    socket?.onAny(handleSocketEvent);

    return () => {
      // Cleanup: Remove the onAny listener when the component unmounts
      socket?.offAny(handleSocketEvent);
    };
  }, [user]);

  const closeMsg = () => {
    setMsg(null);
  };

  const handleMouseEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(closeMsg, 2000);
  };
  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`user-msg ${msg?.status} ${msg ? "up" : ""}`}
    >
      {msg && (
        <>
          <img
            src={
              msg.imgUrl
                ? msg.imgUrl
                : "https://res.cloudinary.com/dpnevk8db/image/upload/v1705844322/zvo0mhdh6lyqgvpavfob.png"
            }
          ></img>
          {msg.link ? (
            <Link to={msg.link}>{msg.text}</Link>
          ) : (
            <h5>{msg.text}</h5>
          )}
        </>
      )}
    </section>
  );
}
