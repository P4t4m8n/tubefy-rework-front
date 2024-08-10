import {
  IPlaylist,
  IPlaylistDetailed,
  IPlaylistObject,
  TPlaylistType,
} from "../models/playlist.model";

export const playlistsToPlaylistObjects = (
  playlists: IPlaylist[]
): IPlaylistObject[] => {
  const playlistMap = new Map<TPlaylistType | string, IPlaylist[]>();

  playlists.forEach((playlist) => {
    if (!playlistMap.has(playlist.types[0])) {
      playlistMap.set(playlist.types[0], []);
    }
    playlistMap.get(playlist.types[0])!.push(playlist);
  });

  const playlistObjects: IPlaylistObject[] = [];
  playlistMap.forEach((playlists, type) => {
    playlistObjects.push({ type, playlists });
  });

  return playlistObjects;
};

export const extractHeroPlaylists = (
  playlistObjects: IPlaylistObject[]
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
    shares: {
      count: 0,
    },
  };
};
