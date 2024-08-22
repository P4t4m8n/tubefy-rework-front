import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistObject,
} from "./playlist.model";
import { ISongYT } from "./song.model";

export interface ICacheState {
  cache: Record<string, TItem | TItem[]>;
  timestamps: Record<string, number>;
}

export interface ICacheAction {
  type: typeof SET_CACHE;
  payload: {
    query: string;
    data: TItem | TItem[];
  };
}

export const SET_CACHE = "SET_CACHE";

export type TItem = ISongYT | IPlaylist | IPlaylistDetailed | IPlaylistObject;
