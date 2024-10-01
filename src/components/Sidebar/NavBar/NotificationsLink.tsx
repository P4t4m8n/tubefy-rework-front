import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import { NotificationSVG } from "../../svg/SVGs";

interface Props {
  checkLocation: (path: string) => boolean;
}
export default function NotificationsLink({ checkLocation }: Props) {
  const notificationsLength =
  useAppSelector((state) => state.notification.notifications?.length) || 0;

  const isNotificationsOpen = checkLocation("notifications");

  return (
    <Link
      to={"/profile/notifications"}
      className={`sidebar-nav-link ${
        isNotificationsOpen && "link-clicked"
      } notification`}
    >
      <NotificationSVG />
      <span>Notifications</span>
      {notificationsLength > 0 && (
        <span className="notification-badge">
          {notificationsLength > 99 ? "99" : notificationsLength}
        </span>
      )}
    </Link>
  );
}
