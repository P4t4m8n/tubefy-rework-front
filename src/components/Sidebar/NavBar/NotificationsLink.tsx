import { Link, Location } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import { NotificationSVG } from "../../svg/SVGs";

interface Props {
  location: Location;
}
export default function NotificationsLink({ location }: Props) {
  const notificationsLLength =
    useAppSelector((state) => state.notification.notifications?.length) || 0;

  const isNotificationsOpen = location.pathname.includes("notifications");

  return (
    <Link
      to={"/profile/notifications"}
      className={`sidebar-nav-link ${isNotificationsOpen && "link-clicked"}`}
    >
      <NotificationSVG />
      <span>Notifications</span>
      {notificationsLLength > 0 && (
        <span className="notification-badge">{notificationsLLength}</span>
      )}
    </Link>
  );
}
