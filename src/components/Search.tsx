import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchSvg } from "./svg/SVGs";
import { utilService } from "../util/util.util";

export function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Use useCallback to memoize the debounced function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNavigate = useCallback(
    utilService.debounce((value: string) => {
      navigate("/search/" + value);
    }, 2000),
    [navigate]
  );

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const value = ev.target.value;
    setSearchTerm(value);

    debouncedNavigate(value);
  };

  return (
    <div className="search-box">
      <SearchSvg />
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        type="text"
        id="searchTerm"
        name="searchTerm"
        placeholder="What do you want to listen to?"
      />
    </div>
  );
}
