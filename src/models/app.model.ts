import { MouseEvent } from "react";
import { TGenericModelBtn } from "./genericModel.model";
import { IUserSmall } from "./user.model";
import { IFriend } from "./friend.model";
import { INotification } from "./notification.model";

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

export interface IModelItem {
  btnSvg?: JSX.Element;
  text: string;
  imgUrl?: string;
  link?: string;
  onClick?: () => void;
  items?: IModelItem[];
  modelSize?: { width: number; height: number };
}

export interface IGenericModelItem {
  btnSvg?: JSX.Element;
  btnText?: string;
  link?: string;
  onClick?: (ev?: MouseEvent) => void;
  items?: IGenericModelItem[];
  modelBtn?: TGenericModelBtn;
  imgUrl?: string;
  modelSize: { width: number; height: number };
}

export type TModelSize = { width: number; height: number };
