import { ChangeEvent, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { SearchSvg } from "../../svg/SVGs";
import GeneralBtn from "../../Menus/GeneralBtn";

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
      <GeneralBtn
        onModelBtnClick={() => setIsSearchOpen((prev) => !prev)}
        btnSvg={<SearchSvg />}
        className="user-playlist-filter-search-btn"
      />
      <input
        type="search"
        placeholder="Search in your library"
        onChange={onFilterChange}
      />
    </div>
  );
}
