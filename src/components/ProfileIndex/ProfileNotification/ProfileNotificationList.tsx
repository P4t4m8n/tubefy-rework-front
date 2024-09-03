import {
  INotification,
  TNotificationType,
} from "../../../models/notification.model";
import GeneralNotification from "./NotificationCmps/GeneralNotification";
import SharePlaylistNotification from "./NotificationCmps/SharePlaylistNotification";

interface Props {
  notifications: INotification[];
  onRemoveNotification: (id: string) => Promise<void>;
}
export default function ProfileNotificationList({
  notifications,
  onRemoveNotification,
}: Props) {
  return (
    <ul className="notification-list">
      {notifications.map((notification) => (
        <DynamicNotificationComponent
          key={notification.id}
          cmpType={notification.type}
          notification={notification}
          onRemoveNotification={onRemoveNotification}
        />
      ))}
    </ul>
  );
}

const DynamicNotificationComponent = (props: {
  cmpType: TNotificationType;
  notification: INotification;
  onRemoveNotification: (id: string) => Promise<void>;
}) => {
  switch (props.cmpType) {
    case "PLAYLIST_SHARE":
      return <SharePlaylistNotification notification={props.notification} />;
    case "PLAYLIST_SONG_ADD":
      return (
        <GeneralNotification
          notification={props.notification}
          link={`/playlist/${props.notification.playlist?.id}`}
          linkText={props.notification.playlist?.name || ""}
          onRemoveNotification={props.onRemoveNotification}
        />
      );
    default:
      return (
        <GeneralNotification
          notification={props.notification}
          onRemoveNotification={props.onRemoveNotification}
        />
      );
  }
};
