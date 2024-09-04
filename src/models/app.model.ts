import { MouseEvent } from "react";
import { TGenericModelBtn } from "./genericModel.model";
import { IUserSmall } from "./user.model";
import { IFriend } from "./friend.model";
import { INotification } from "./notification.model";

export interface IGenericModelItem {
  btnSvg?: JSX.Element;
  text?: string;
  link?: string;
  onClick?: (ev?: MouseEvent) => void;
  items?: IGenericModelItem[];
  modelBtn?: TGenericModelBtn;
  children?: IGenericModelItem[];
  coords?: IModelCoords;
  imgUrl?: string;
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

enum ItemType {
  SONG,
  PLAYLIST,
  YT_SONG,
}

export type TItem = keyof typeof ItemType;

export interface IItemType {
  itemType: TItem;
}
