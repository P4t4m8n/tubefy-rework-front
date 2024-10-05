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

export const GENRES = [
  "rock",
  "pop",
  "50s",
  "60s",
  "80s",
  "decades",
  "r&b",
  "ballad",
  "oldies",
  "country",
  "hip-hop",
  "alternative",
  "reggae",
  "electronic",
  "folk",
  "acoustic",
  "funk",
  "soul",
  "cover",
  "soundtrack",
  "live",
  "latin",
  "dance",
  "new wave",
  "90s",
  "disco",
  "70s",
  "jazz",
  "metal",
  "00s",
  "indie",
  "punk",
  "world",
  "emo",
  "chill-out",
  "remix",
  "edm",
  "house",
  "trance",
  "techno",
  "psychedelic",
  "blues",
  "middle eastern",
  "rap",
  "classical",
  "kids",
  "other",
  "10s",
  "mood",
  "party",
] as const;

export type TGenres = (typeof GENRES)[number];
