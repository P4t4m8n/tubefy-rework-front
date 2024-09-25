import { MouseEvent } from "react";

export type TInputUserFormKeys = "email" | "username" | "password";

export interface IModelAction<ModelItem> {
  action?: (item: ModelItem, ev?: MouseEvent) => void | Promise<void>;
  text: string;
  link?: string;
  icon?: JSX.Element;
}

enum ItemType {
  SONG,
  PLAYLIST,
  YT_SONG,
}

export type TItem = keyof typeof ItemType;

export interface IItemType {
  itemType: TItem;
}

export interface IModelItem {
  btnSvg?: JSX.Element;
  text: string;
  imgUrl?: string;
  link?: string;
  onClick?: () => void;
  items?: IModelItem[];
  modelSize?: { width: number; height: number };
}

export type TModelSize = { width: number; height: number };

export type TSessionDataKeys =
  | "user"
  | "playlists"
  | "likedPlaylist"
  | "friends"
  | "friendRequests"
  | "chats"
  | "notifications"
  | "defaultPlaylists";
