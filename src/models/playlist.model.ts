import { ISong } from "./song.model";
import { IUserSmall } from "./user.model";

export interface IPlaylist {
  id: string;
  name: string;
  genres: TGenres[];
  imgUrl: string;
  createBy: IUserSmall;
  songs: ISong[];
  duration: number;
  description: string;
  type: TPlaylistType;
}

export interface IPlaylistDTO {
  id?: string;
  name: string;
  imgUrl: string;
  createByUserId: string;
  duration: number;
  description: string;
}

export interface IPlaylistFilter {
  genres: TGenres[];
  name: string;
  createBy: IUserSmall;
}

export interface IPlaylistState {
  mainPlaylists: IPlaylistObject[];
  currentPlaylist: IPlaylist | null;
}

export interface IPlaylistAction {
  type: TPlaylistActionType;
  payload: IPlaylist | IPlaylistObject[];
}

export interface IPlaylistObject {
  type: TPlaylistType;
  playlists: IPlaylist[];
}

export type TPlaylistActionType = "SET_MAIN_PLAYLISTS" | "SET_CURRENT_PLAYLIST";

export type TPlaylistType =
  | "New Music"
  | "Daily mix"
  | " Chill"
  | "Workout"
  | "Party"
  | "Focus"
  | "Sleep"
  | "Travel"
  | "Kids"
  | "Cooking"
  | "Wellness"
  | "Study"
  | "Chillout"
  | "New Wave";

export type TGenres =
  | "pop"
  | "rock"
  | "jazz"
  | "blues"
  | "hip-hop"
  | "rap"
  | "country"
  | "classical"
  | "folk"
  | "latin"
  | "metal"
  | "reggae"
  | "soul"
  | "electronic"
  | "dance"
  | "indie"
  | "alternative"
  | "punk"
  | "r&b"
  | "funk"
  | "disco"
  | "techno"
  | "house"
  | "trance"
  | "dubstep"
  | "drum&bass"
  | "ambient"
  | "chillout"
  | "downtempo"
  | "reggaeton"
  | "ska"
  | "grunge"
  | "emo"
  | "gothic"
  | "hardcore"
  | "hardstyle"
  | "industrial"
  | "new wave"
  | "noise"
  | "psychedelic"
  | "ska"
  | "synthpop"
  | "trap"
  | "vaporwave"
  | "world"
  | "other";
