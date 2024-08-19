import { ChangeEvent, useRef } from "react";
import GenericModel from "../GenericComponents/GenericModel";
import { useModel } from "../../hooks/useModel";
import { SearchSvg, SortSVG } from "../svg/SVGs";

interface Props {
  onFilterChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  sortPlaylists: (sortBy: "recently_added" | "alphabetical") => void;
}
export default function UserLibraryFilter({
  onFilterChange,
  sortPlaylists,
}: Props) {
  const searchConRef = useRef(null);
  const [iseSearchOpen, setIsSearchOpen] = useModel(searchConRef);

  return (
    <div className="user-playlist-filter">
      <div
        ref={searchConRef}
        className={`user-playlist-filter-search ${
          iseSearchOpen ? "open" : "close"
        }`}
      >
        <button
          className="user-playlist-filter-search-btn"
          onClick={() => setIsSearchOpen(true)}
        >
          <SearchSvg />
        </button>
        <input
          type="search"
          placeholder="Search in your library"
          onChange={onFilterChange}
        />
      </div>
      <GenericModel btnSvg={<SortSVG />}>
        <h2>Sort by</h2>
        <li>
          <button onClick={() => sortPlaylists("recently_added")}>
            <span>Recently added</span>
          </button>
        </li>
        <li>
          <button onClick={() => sortPlaylists("alphabetical")}>
            <span>Alphabetical</span>
          </button>
        </li>
      </GenericModel>
    </div>
  );
}
