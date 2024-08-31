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
  action?: (ev: MouseEvent, item: T) => void | Promise<void>;
  text: string;
  link?: string;
  icon?: JSX.Element;
}

export interface INotification {
  text: string;
  imgUrl?: string;
  type: TNotificationType;
  status: "success" | "error";
  link?: string;
}
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
