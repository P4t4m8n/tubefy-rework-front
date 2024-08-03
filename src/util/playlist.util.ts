import {
  IPlaylist,
  IPlaylistObject,
  TPlaylistType,
} from "../models/playlist.model";

export const playlistsToPlaylistObjects = (
  playlists: IPlaylist[]
): IPlaylistObject[] => {
  const playlistMap = new Map<TPlaylistType, IPlaylist[]>();

  playlists.forEach((playlist) => {
    if (!playlistMap.has(playlist.type)) {
      playlistMap.set(playlist.type, []);
    }
    playlistMap.get(playlist.type)!.push(playlist);
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
  return playlistObjects.map((playlistObject) => playlistObject.playlists[0]);
};

