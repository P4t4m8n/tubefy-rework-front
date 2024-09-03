//Interfaces
export interface ISocketService {
  connect(): void;
  disconnect(): void;
  on<T>(evName: TSocketEvent, listener: TListener<T>): void;
  off<T>(evName: TSocketEvent, listener: TListener<T>): void;
  emit<T>(evName: TSocketEvent, data: T): void;
  terminate(): void;
}

//Types
export type TListener<T> = (data: T) => void;

export type TSocketEvent = TSocketEventShare | TSocketEventFriend;

export type TSocketEventShare =
  | "sharePlaylist"
  | "isOpenPlaylist"
  | "joinPlaylist"
  | "leavePlaylist"
  | "addSongToPlaylist";

export type TSocketEventFriend =
  | "sendFriendRequest"
  | "rejectFriendRequest"
  | "approveFriendRequest"
  | "blockFriendRequest"
  | "removeFriendRequest";
