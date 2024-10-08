import { IFriend } from "./friend.model";
import { IPlaylistSmall } from "./playlist.model";
import { ISong } from "./song.model";
import { IUserSmall } from "./user.model";

// export interface ISharePlaylistNotification {
//   playlist: {
//     name: string;
//     imgUrl: string;
//     playlistId: string;
//   };
//   user: {
//     username: string;
//     imgUrl: string | null | undefined;
//   };
// }

// export interface INotificationDTO {
//   userId: string;
//   fromUserId: string;
//   type: NotificationType;
//   text: string;
//   playlistId?: string;
//   songId?: string;
// }

export interface INotification {
  id?: string;
  imgUrl: string;
  fromUser?: IUserSmall;
  type: TNotificationType;
  text: string;
  playlist?: IPlaylistSmall | null;
  song?: ISong | null;
  friend?: IFriend;
}

export interface INotificationProps extends INotification {
  status: TNotificationStatus;
  link?: string;
  children?: JSX.Element;
}

enum NotificationType {
  FRIEND_REQUEST,
  FRIEND_ACCEPTED,
  FRIEND_REJECTED,
  FRIEND_BLOCKED,
  FRIEND_REMOVED,

  PLAYLIST_LIKE,
  PLAYLIST_SHARE,

  PLAYLIST_COMMENT,
  SONG_LIKE,
  SONG_COMMENT,
  SONG_SHARE,
  PLAYLIST_SONG_ADD,

  GENERAL_NOTIFICATION,
  GENERAL_ERROR,
  WELCOME,
  GOODBYE,

  PLAYLIST_DELETE,
  PLAYLIST_EDIT,
  PLAYLIST_CREATE,
  PLAYLIST_REMOVE_SONG,
}

type TNotificationStatus = "success" | "error";

export type TNotificationType = keyof typeof NotificationType;

//Redux
export interface INotificationState {
  notifications: INotification[] | null;
}

const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

export type TNotificationActionType = typeof SET_NOTIFICATIONS;

export interface INotificationAction {
  type: TNotificationActionType;
  payload: INotification[] | null;
}
