import { useCallback } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import ProfileNotificationList from "./ProfileNotificationList";
import { removeNotificationServer } from "../../../store/actions/notification.action";

export default function ProfileNotificationIndex() {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  const onRemoveNotification = useCallback(async (id: string) => {
    await removeNotificationServer(id);
  }, []);
  return (
    <section className="notification-index">
      {!notifications || notifications?.length === 0 ? (
        <h2>You have No notifications</h2>
      ) : (
        <>
          <h2>Notifications</h2>
          <ProfileNotificationList
            notifications={notifications}
            onRemoveNotification={onRemoveNotification}
          />
        </>
      )}
    </section>
  );
}
