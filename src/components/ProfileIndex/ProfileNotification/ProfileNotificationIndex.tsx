import { useAppSelector } from "../../../hooks/useStore";
import ProfileNotificationList from "./ProfileNotificationList";

export default function ProfileNotificationIndex() {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  return (
    <section className="notification-index">
      {!notifications || notifications?.length === 0 ? (
        <h2>You have No notifications</h2>
      ) : (
        <>
          <h2>Notifications</h2>
          <ProfileNotificationList notifications={notifications} />
        </>
      )}
    </section>
  );
}
