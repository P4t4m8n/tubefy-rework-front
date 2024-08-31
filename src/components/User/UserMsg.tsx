import { useRef, useState } from "react";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { eventBus, SHOW_MSG } from "../../services/eventEmitter";
import { INotification } from "../../models/app.model";
import { Link } from "react-router-dom";

export default function UserMsg() {
  const [msg, setMsg] = useState<INotification | null>(null);
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
