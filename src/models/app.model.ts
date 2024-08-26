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

export interface INotification {
  text: string;
  imgUrl?: string;
  type: string;
  status: "success" | "error";
}
export type TNotificationType = "like" | "general-error";

export interface IItemType {
  itemType: "song" | "playlist" | "YTsong" | "YTplaylist";
}


