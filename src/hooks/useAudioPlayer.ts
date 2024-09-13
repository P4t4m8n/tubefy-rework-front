import { useRef, useState } from "react";

import { useEffectUpdate } from "./useEffectUpdate";

import { ISong, ISongYT } from "../models/song.model";
import { IPlaylist } from "../models/playlist.model";

import { loadSong } from "../store/actions/player.action";
import { utilService } from "../util/util.util";

import { YouTubeEvent } from "react-youtube";

import { youTubePlayer } from "../services/player.service";

export const useAudioPlayer = (
  playingSong: ISong | ISongYT,
  currentPlaylist: IPlaylist | null
) => {
  const [songOrderMode, setSongOrderMode] = useState<
    "shuffle" | "repeat" | "normal"
  >("normal");
  const stationIdx = useRef(0);

  useEffectUpdate(() => {
    if (!playingSong && currentPlaylist) loadSong(currentPlaylist.songs[0]);
  }, [playingSong, currentPlaylist]);

  const onEnd = () => {
    if (songOrderMode === "shuffle") {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length - 1
      );
    }

    if (songOrderMode === "normal") {
      stationIdx.current++;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
    }

    loadSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onChangeOrder = (order: "shuffle" | "repeat") => {
    setSongOrderMode((prev) => (prev === order ? "normal" : order));
  };

  const onChangeSong = (dir: number) => {
    if (songOrderMode === "shuffle") {
      stationIdx.current = utilService.getRandomIntInclusive(
        0,
        currentPlaylist!.songs.length - 1
      );
    } else if (songOrderMode === "normal") {
      stationIdx.current += dir;
      if (stationIdx.current >= currentPlaylist!.songs.length)
        stationIdx.current = 0;
      if (stationIdx.current < 0)
        stationIdx.current = currentPlaylist!.songs.length - 1;
    }

    loadSong(currentPlaylist!.songs[stationIdx.current]);
  };

  const onReady = (ev: YouTubeEvent) => {
    const vol = youTubePlayer.volume || 0;
    youTubePlayer.setPlayer(ev.target);
    youTubePlayer.setVolume(vol);
  };

  return { onEnd, onReady, onChangeOrder, onChangeSong, songOrderMode };
};
