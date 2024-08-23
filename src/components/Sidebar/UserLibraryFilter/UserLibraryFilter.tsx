import { ChangeEvent } from "react";
import UserLibraryFilterSortModel from "./UserLibraryFilterSortModel";
import UserLibraryFilterSearch from "./UserLibraryFilterSearch";

interface Props {
  onFilterChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  sortPlaylists: (sortBy: "recently_added" | "alphabetical") => void;
  currentSortBy: string;
}
export default function UserLibraryFilter({
  onFilterChange,
  sortPlaylists,
  currentSortBy,
}: Props) {
  return (
    <div className="user-playlist-filter">
      <UserLibraryFilterSearch onFilterChange={onFilterChange} />
      <UserLibraryFilterSortModel
        sortPlaylists={sortPlaylists}
        currentSortBy={currentSortBy}
      />
    </div>
  );
}
