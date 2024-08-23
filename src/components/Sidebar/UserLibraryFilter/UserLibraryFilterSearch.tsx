import { ChangeEvent, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { SearchSvg } from "../../svg/SVGs";

interface Props {
  onFilterChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export default function UserLibraryFilterSearch({ onFilterChange }: Props) {
  const searchConRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useModel(searchConRef);
  return (
    <div
      ref={searchConRef}
      className={`user-playlist-filter-search ${
        isSearchOpen ? "open" : "close"
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
  );
}
