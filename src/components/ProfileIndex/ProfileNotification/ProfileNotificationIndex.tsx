import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/useStore";
import { IModelAction } from "../../../models/app.model";
import { INotification } from "../../../models/notification.model";
import { approveSharePlaylist, rejectSharedPlaylist } from "../../../store/actions/playlist.action";
import { utilService } from "../../../util/util.util";
import SharePlaylistNotification from "../../User/UserSocketNotifications/SharePlaylistNotfication";
import { CheckSVG, PlaySVG } from "../../svg/SVGs";

export default function ProfileNotificationIndex() {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  const handleClick = async (
    approve: boolean,
    notificationId?: string,
    playlistId?: string
  ) => {
    if (!playlistId || !notificationId) {
      utilService.handleError(
        "Playlist not found",
        "PLAYLIST_SHARE",
        new Error("Playlist not found or notification id not found")
      );
      return;
    }
    if (approve) {
      await approveSharePlaylist(playlistId, notificationId);
      utilService.handleSuccess(
        "Playlist added to your library",
        "PLAYLIST_SHARE"
      );
      return;
    }

    await rejectSharedPlaylist(playlistId, notificationId);
    utilService.handleSuccess("Playlist rejected", "PLAYLIST_SHARE");
    return;
  };

  const modelActions: IModelAction<INotification>[] = useMemo(
    () => [
      {
        text: "APPROVE",
        action: ({ playlist, id }) => {
          handleClick(true, id, playlist?.id);
        },
        icon: <CheckSVG />,
      },
      {
        text: "REJECT",
        action: ({ playlist, id }) => {
          handleClick(false, id, playlist?.id);
        },
        icon: <PlaySVG />,
      },
    ],
    []
  );
  return (
    <section className="notification-index">
      {!notifications || notifications?.length === 0 ? (
        <h2>You have No notifications</h2>
      ) : (
        <h2>Notifications</h2>
      )}
      <ul className="notification-list">
        {notifications?.map((notification) => (
          <SharePlaylistNotification
            key={notification.id}
            data={notification}
          />
        ))}
      </ul>
    </section>
  );
}
