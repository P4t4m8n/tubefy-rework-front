import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";
import { ISong, ISongYT } from "../models/song.model";
import { IPlaylistDetailed } from "../models/playlist.model";
import { songService } from "../services/song.service";
import {
  updateUserPlaylists,
  updateUserLikedSongPlaylist,
} from "../store/actions/playlist.action";
import { playlistService } from "../services/playlist.service";
import { showUserMsg } from "../services/eventEmitter";

export const useLike = (
  item: ISongYT | ISong | IPlaylistDetailed
): {
  isLiked: boolean;
  toggleLike: () => Promise<void>;
} => {
  const [isLiked, setIsLiked] = useState(false);

  const itemType = item.itemType;
  useEffectUpdate(() => {
    if (item && itemType !== "YTsong") {
      setIsLiked((item as ISong | IPlaylistDetailed).isLikedByUser);
    }
  }, [item]);

  const toggleLike = async () => {
    let finishCheck = false;

    //optimistic update
    setIsLiked(!isLiked);
    try {
      const itemType = item.itemType;
      switch (itemType) {
        case "song":
          finishCheck = await songService.toggleSongLike(
            (item as ISong).id,
            isLiked
          );
          updateUserLikedSongPlaylist(item as ISong);
          break;
        case "playlist":
          finishCheck = await playlistService.togglePlaylistLIke(
            (item as IPlaylistDetailed).id!,
            isLiked
          );
          updateUserPlaylists(item as IPlaylistDetailed);
          break;
        case "YTsong": {
          const song = await songService.createSong(item as ISongYT);
          updateUserLikedSongPlaylist(song);
          finishCheck = await songService.toggleSongLike(song.id, isLiked);
          break;
        }
        default:
          break;
      }

      showUserMsg({
        type: "like",
        status: "success",
        text: isLiked ? "Removed from Liked" : "Added to Liked",
      });
    } catch (error) {
      showUserMsg({
        type: "like",
        status: "error",
        text: error as string,
      });
    } finally {
      if (!finishCheck) {
        setIsLiked(isLiked);
      }
    }
  };

  return { isLiked, toggleLike };
};
