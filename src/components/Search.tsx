import { ChangeEvent, useCallback } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { utilService } from "../util/util.util";
import { SearchSvg } from "./svg/SVGs";

export function Search() {
  const navigate = useNavigate();
  const params: Params = useParams<{ searchTerm?: string }>();

  const searchTerm = params.searchTerm || "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNavigate = useCallback(
    utilService.debounce((value: string) => {
      navigate("/search/" + value);
    }, 2000),
    [params]
  );

  function handleSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    const value = ev.target.value;

    debouncedNavigate(value);
  }

  return (
    <form>
      <p></p>
      <SearchSvg />
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        type="text"
        id="searchTerm"
        name="searchTerm"
        placeholder="What do you want to listen to?"
      />
    </form>
  );
}
