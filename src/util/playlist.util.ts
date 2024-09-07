import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistsGroup,
  IPlaylistModelData,
  TPlaylistType,
} from "../models/playlist.model";
import { getUserPlaylistsState } from "../store/getStore";


export const playlistsToPlaylistsGroup = (
  playlists: IPlaylist[]
): IPlaylistsGroup[] => {
  const playlistMap = new Map<TPlaylistType | string, IPlaylist[]>();

  playlists.forEach((playlist) => {
    if (!playlistMap.has(playlist.types[0])) {
      playlistMap.set(playlist.types[0], []);
    }
    playlistMap.get(playlist.types[0])!.push(playlist);
  });

  const playlistObjects: IPlaylistsGroup[] = [];
  playlistMap.forEach((playlists, type) => {
    playlistObjects.push({ type, playlists });
  });

  return playlistObjects;
};
export const extractHeroPlaylists = (
  playlistObjects: IPlaylistsGroup[]
): IPlaylist[] => {
  if (!playlistObjects.length) {
    return [];
  }

  const heroPlaylists = playlistObjects.map(
    (playlistObject) => playlistObject.playlists[0]
  );

  if (heroPlaylists.length < 8) {
    for (let i = heroPlaylists.length; i < 8; i++) {
      heroPlaylists.push(playlistObjects[i % 7].playlists[1]);
    }
  }
  return heroPlaylists.splice(0, 8);
};
export const getEmptyPlaylist = (num: number): IPlaylistDetailed => {
  return {
    id: "",
    name: `New Playlist ${num + 1}`,
    imgUrl: "",
    songs: [],
    description: "",
    genres: [],
    types: [""],
    owner: {
      username: "",
      isAdmin: false,
      id: "",
      imgUrl: "",
    },
    duration: "00:00",
    isPublic: false,
    isLikedByUser: false,
    createdAt: "",
    itemType: "PLAYLIST",
  };
};
export const transformUserPlaylistsStateForModel = (
  playlistId = ""
): IPlaylistModelData[] => {
  const userPlaylists = getUserPlaylistsState();

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


