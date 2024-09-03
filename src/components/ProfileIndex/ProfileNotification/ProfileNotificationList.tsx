import {
  INotification,
  TNotificationType,
} from "../../../models/notification.model";
import GeneralNotification from "../../User/NotificationCmps/GeneralNotification";
import SharePlaylistNotification from "../../User/NotificationCmps/SharePlaylistNotification";

interface Props {
  notifications: INotification[];
}
export default function ProfileNotificationList({ notifications }: Props) {
  return (
    <ul className="notification-list">
      {notifications.map((notification) => (
        <DynamicNotificationComponent
          key={notification.id}
          cmpType={notification.type}
          notification={notification}
        />
      ))}
    </ul>
  );
}

const DynamicNotificationComponent = (props: {
  cmpType: TNotificationType;
  notification: INotification;
}) => {
  switch (props.cmpType) {
    case "PLAYLIST_SHARE":
      return <SharePlaylistNotification notification={props.notification} />;
    default:
      return <GeneralNotification notification={props.notification} />;
  }
};
