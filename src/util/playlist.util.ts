import { RefObject } from "react";
import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistsGroup,
  IPlaylistModelData,
} from "../models/playlist.model";
import { ISong } from "../models/song.model";
import { IUserSmall } from "../models/user.model";
import { getUserPlaylistsState } from "../store/getStore";
import { TModelSize } from "../models/app.model";
import {
  REGULAR_SONG_MENU_SIZE,
  WITH_REMOVE_SONG_MENU_SIZE,
} from "./constants.util";


export const extractHeroPlaylists = (
  playlistObjects: IPlaylistsGroup[]
): IPlaylist[] => {
  if (!playlistObjects.length) {
    return [];
  }

  const heroPlaylists = playlistObjects.map(
    (playlistObject) => playlistObject.playlists[0]
  );

  if (heroPlaylists.length < playlistObjects.length) {
    for (let i = heroPlaylists.length; i < 8; i++) {
      heroPlaylists.push(playlistObjects[i % 7].playlists[1]);
    }
  }
  return heroPlaylists.splice(0, 8);
};
export const getEmptyPlaylist = (
  num: number,
  user: IUserSmall
): IPlaylistDetailed => {
  const { id, username, imgUrl } = user;
  const owner = { id, username, imgUrl };
  return {
    id: "",
    name: `New Playlist ${num + 1}`,
    imgUrl: "",
    songs: [],
    description: "",
    genres: [],
    types: [""],
    owner,
    duration: "00:00",
    isPublic: false,
    isLikedByUser: false,
    createdAt: "",
    itemType: "PLAYLIST",
  };
};
// export const transformUserPlaylistsStateForModel = (
//   playlistId = ""
// ): IPlaylistModelData[] => {
//   const userPlaylists = getUserPlaylistsState();

//   return userPlaylists.reduce((acc: IPlaylistModelData[], playlist) => {
//     if (playlist.id !== playlistId) {
//       acc.push({
//         playlistsId: playlist.id || "",
//         playlistsName: playlist.name,
//         playlistImg: playlist.imgUrl,
//       });
//     }
//     return acc;
//   }, []);
// };
export const transformUserPlaylistsForModel = (
  userPlaylists: IPlaylistDetailed[],
  playlistId = ""
): IPlaylistModelData[] => {
  return userPlaylists.reduce((acc: IPlaylistModelData[], playlist) => {
    if (playlist.id !== playlistId) {
      acc.push({
        playlistsId: playlist.id || "",
        playlistsName: playlist.name,
        playlistImg: playlist.imgUrl,
      });
    }
    return acc;
  }, []);
};
export const isAllowedToEditPlaylist = (
  playlistId: string,
  userId?: string
) => {
  if (!userId) return false;

  const userPlaylists = getUserPlaylistsState();

  return userPlaylists.some((playlist) => playlist.id === playlistId);
};
export const getPlaylistSongsProps = (
  songs: ISong[],
  isOwner: boolean,
  container: RefObject<HTMLDivElement | HTMLUListElement>,
  isActive: boolean,
  isLoggedIn: boolean,
  onRemoveSongFromPlaylist?: (songId: string) => void
) => {
  const playlistSongsProps: {
    songs: ISong[];
    isOwner: boolean;
    container: RefObject<HTMLDivElement | HTMLUListElement>;
    onRemoveSongFromPlaylist?: (songId: string) => void;
    isActive?: boolean;
    isLoggedIn?: boolean;
    modelSize: TModelSize;
  } = {
    songs,
    isOwner,
    container,
    isActive,
    modelSize: REGULAR_SONG_MENU_SIZE,
    isLoggedIn,
  };

  if (isOwner) {
    playlistSongsProps.onRemoveSongFromPlaylist = onRemoveSongFromPlaylist;
    playlistSongsProps.modelSize = WITH_REMOVE_SONG_MENU_SIZE;
  }

  return playlistSongsProps;
};
