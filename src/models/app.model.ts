import { MouseEvent } from "react";
import { TGenericModelBtn } from "./genericModel.model";
import { IUserSmall } from "./user.model";
import { IFriend } from "./friend.model";
import { INotification } from "./notification.model";

export interface IGenericModelItem {
  svg?: JSX.Element;
  text?: string;
  link?: string;
  onClick?: (ev?: MouseEvent) => void;
  items?: IGenericModelItem[];
  modelBtn?: TGenericModelBtn;
}
export interface IModelCoords {
  x: number;
  y: number;
}

export interface IModelAction<ModelItem> {
  action?: (item: ModelItem, ev?: MouseEvent) => void | Promise<void>;
  text: string;
  link?: string;
  icon?: JSX.Element;
}
export type TModelItem = IUserSmall | IFriend | INotification;

export interface IItemType {
  itemType: "song" | "playlist" | "YTsong" | "YTplaylist";
}
