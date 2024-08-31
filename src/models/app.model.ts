import { MouseEvent } from "react";

export interface IGenericModelItem {
  svg?: JSX.Element;
  text?: string;
  link?: string;
  onClick?: (ev?: MouseEvent) => void;
}
export interface IModelCoords {
  x: number;
  y: number;
}

export interface IModelAction<T> {
  action?: (item: T, ev?: MouseEvent) => void | Promise<void>;
  text: string;
  link?: string;
  icon?: JSX.Element;
}

export interface INotification {
  text: string;
  imgUrl?: string;
  type: TNotificationType;
  status: TNotificationStatus;
  link?: string;
}

export type TNotificationStatus = "success" | "error";
export type TNotificationType =
  | "like"
  | "general-error"
  | "welcome"
  | "goodbye"
  | "playlist-share"
  | "friend";

export interface IItemType {
  itemType: "song" | "playlist" | "YTsong" | "YTplaylist";
}
