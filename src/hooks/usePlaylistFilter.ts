import { ChangeEvent, useRef, useState } from "react";
import { IPlaylistDetailed } from "../models/playlist.model";
import { useAppSelector } from "./useStore";

export const usePlaylistFilter = () => {
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  const [filteredPlaylists, setFilteredPlaylists] = useState<
    IPlaylistDetailed[]
  >([]);
  const currentSortBy = useRef<"recently_added" | "alphabetical" | "">("");

  console.log("userPlaylists:", userPlaylists)
  const onFilterChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.toLowerCase();
    const _filteredPlaylists = userPlaylists.filter(
      (playlist) =>
        playlist.name.toLowerCase().includes(value) ||
        playlist.songs.some((song) => song.name.toLowerCase().includes(value))
    );

    setFilteredPlaylists(_filteredPlaylists);
  };

  const sortPlaylists = (sortBy: "recently_added" | "alphabetical") => {
    const _filteredPlaylists = [...userPlaylists];
    if (sortBy === "recently_added") {
      _filteredPlaylists.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } else {
      _filteredPlaylists.sort((a, b) => a.name.localeCompare(b.name));
    }
    currentSortBy.current = sortBy;
    setFilteredPlaylists(_filteredPlaylists);
  };

  const playlists = filteredPlaylists.length
    ? filteredPlaylists
    : userPlaylists;

  return {
    playlists,
    userPlaylistLength: userPlaylists.length, //For giving a correct number when creating anew playlist
    currentSortBy: currentSortBy.current,
    onFilterChange,
    sortPlaylists,
  };
};
