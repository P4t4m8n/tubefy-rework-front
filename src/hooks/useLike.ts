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
import { utilService } from "../util/util.util";
import { TNotificationType } from "../models/notification.model";
import { getUserLikedPlaylist } from "../store/getStore";

export const useLike = (
  item: ISongYT | ISong | IPlaylistDetailed
): {
  isLiked: boolean;
  toggleLike: () => Promise<void>;
} => {
  const [isLiked, setIsLiked] = useState(false);

  const itemType = item.itemType;
  useEffectUpdate(() => {
    if (item && itemType !== "YT_SONG") {
      setIsLiked((item as ISong | IPlaylistDetailed).isLikedByUser);
    }
  }, [item]);

  const toggleLike = async () => {
    const userLikedPlaylist = getUserLikedPlaylist();
    if (!userLikedPlaylist) {
      utilService.handleError(
        "You need to be logged in to like ",
        "GENERAL_ERROR",
        new Error("No user found")
      );
      return;
    }
    let finishCheck = false;

    //optimistic update
    setIsLiked(!isLiked);
    try {
      const itemType = item.itemType;
      switch (itemType) {
        case "SONG":
          finishCheck = await songService.toggleSongLike(
            (item as ISong).id,
            isLiked
          );
          updateUserLikedSongPlaylist(item as ISong);
          break;
        case "PLAYLIST":
          finishCheck = await playlistService.togglePlaylistLIke(
            (item as IPlaylistDetailed).id!,
            isLiked
          );
          updateUserPlaylists(item as IPlaylistDetailed);
          break;
        case "YT_SONG": {
          const song = await songService.createSong(
            userLikedPlaylist.id,
            item as ISongYT
          );
          updateUserLikedSongPlaylist(song);
          finishCheck = await songService.toggleSongLike(song.id, isLiked);
          break;
        }
        default:
          break;
      }

      const notificationType = (itemType.toUpperCase() +
        "_LIKE") as TNotificationType;

      const str = `${
        !isLiked ? "You liked" : "You dislike"
      } ${itemType.toLowerCase()} ${item.name}`;
      utilService.handleSuccess(str, notificationType, item.imgUrl);
    } catch (error) {
      utilService.handleError("like", "GENERAL_ERROR", error as Error);
    } finally {
      if (!finishCheck) {
        setIsLiked(isLiked);
      }
    }
  };

  return { isLiked, toggleLike };
};
