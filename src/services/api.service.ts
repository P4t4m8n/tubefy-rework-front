import axios from "axios";
import { ISongYT } from "../models/song.model";
import { IPlaylistYT } from "../models/playlist.model";

const API_KEY_YT = import.meta.env.VITE_API_KEY_YT;
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const URL_SEARCH = `${BASE_URL}/search?key=${API_KEY_YT}&`;
const URL_PLAYLIST_ITEMS = `${BASE_URL}/playlistItems?`;
const URL_VIDEOS = `${BASE_URL}/videos?`;
const MAX_RESULTS = 10;

interface ytSongResponse {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  id: {
    videoId: string;
  };
}
interface ytPlaylistResponse {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  id: {
    playlistId: string;
  };
}
interface ytPlaylistItemResponse {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

const fetchFromYT = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error(`Error fetching data from YouTube API: ${error}`);
    throw error;
  }
};

const getSongsFromYT = async (search: string): Promise<ISongYT[]> => {
  const url = `${URL_SEARCH}part=snippet&q=${search}&videoCategoryId=10&type=video&maxResults=${MAX_RESULTS}`;
  const items = await fetchFromYT(url);

  const promisesSongs = items.map(
    async (ytItem: ytSongResponse): Promise<ISongYT> => {
      const searchInfo = parseSongString(ytItem.snippet.title);
      const duration = await _getDuration(ytItem.id.videoId);
      return {
        name: searchInfo.name,
        artist: searchInfo.artist,
        duration,
        youtubeId: ytItem.id.videoId,
        thumbnail: ytItem.snippet.thumbnails.medium.url,
        addedBy: "artist",
        createAt: new Date(),
      };
    }
  );

  return await Promise.all(promisesSongs);
};

const getPlaylistsFromYT = async (search: string): Promise<IPlaylistYT[]> => {
  const url = `${URL_SEARCH}part=snippet&q=${search}&type=playlist&maxResults=${MAX_RESULTS}`;
  const items = await fetchFromYT(url);

  const promisesPlaylists = items.map(
    async (playlist: ytPlaylistResponse): Promise<IPlaylistYT> => {
      const songs = await fetchSongsFromPlaylist(playlist.id.playlistId);
      const duration = _calculateTotalDuration(songs);
      return {
        name: playlist.snippet.title,
        imgUrl: playlist.snippet.thumbnails.medium.url,
        songs,
        description: "",
        duration,
        isPublic: true,
      };
    }
  );

  return await Promise.all(promisesPlaylists);
};

const fetchSongsFromPlaylist = async (
  playlistId: string
): Promise<ISongYT[]> => {
  const url = `${URL_PLAYLIST_ITEMS}part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY_YT}`;
  const items = await fetchFromYT(url);

  const promisesSongs = items.map(
    async (song: ytPlaylistItemResponse): Promise<ISongYT> => {
      const youtubeId = song.snippet.resourceId.videoId;
      const duration = await _getDuration(youtubeId);
      const { name, artist } = parseSongString(song.snippet.title);
      return {
        name,
        artist,
        duration,
        youtubeId,
        thumbnail: song.snippet.thumbnails.medium.url,
        addedBy: "artist",
        createAt: new Date(),
      };
    }
  );

  return await Promise.all(promisesSongs);
};

const parseSongString = (
  songString: string
): { artist: string; name: string } => {
  songString = songString.replace(/\[.*?\]|\(.*?\)/g, "");
  const splitIndex = songString.search(/[^a-zA-Z0-9 ]/);
  let artist;
  let name;

  if (splitIndex !== -1) {
    artist = songString.substring(0, splitIndex).trim();
    name = songString.substring(splitIndex + 1).trim();
  } else {
    artist = "Unknown";
    name = songString.trim();
  }

  artist = artist.replace(/[^a-zA-Z0-9]/g, " ");
  name = name.replace(/[^a-zA-Z0-9]/g, " ");

  if (!artist) artist = "Unknown";
  if (!name) name = "Unknown";

  return { artist, name };
};

const _getDuration = async (videoId: string): Promise<string> => {
  const url = `${URL_VIDEOS}id=${videoId}&part=contentDetails&key=${API_KEY_YT}`;

  try {
    const response = await axios.get(url);
    const duration = response.data.items[0]?.contentDetails?.duration;

    if (!duration) {
      throw new Error(`No duration found for video ${videoId}`);
    }

    return _formatDuration(duration);
  } catch (err) {
    console.error(`Error getting duration for video ${videoId}: ${err}`);
    throw err;
  }
};

const _formatDuration = (duration: string): string => {
  if (duration === "P0D") return "99:99:99";

  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) return "01:00";

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  const formattedHours = hours > 0 ? `${_padWithZero(hours)}:` : "";
  const formattedMinutes = _padWithZero(minutes);
  const formattedSeconds = _padWithZero(seconds);

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};

const _calculateTotalDuration = (songs: ISongYT[]): string => {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  songs.forEach(({ duration }) => {
    const parts = duration.split(":").map(Number);
    if (parts.length === 3) {
      totalHours += parts[0];
      totalMinutes += parts[1];
      totalSeconds += parts[2];
    } else if (parts.length === 2) {
      totalMinutes += parts[0];
      totalSeconds += parts[1];
    } else if (parts.length === 1) {
      totalSeconds += parts[0];
    }
  });

  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return `${_padWithZero(totalHours)}:${_padWithZero(
    totalMinutes
  )}:${_padWithZero(totalSeconds)}`;
};

function _padWithZero(number: number): string {
  return number.toString().padStart(2, "0");
}

export const apiService = {
  getSongsFromYT,
  getPlaylistsFromYT,
};
