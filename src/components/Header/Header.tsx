import { Location, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

import { Search } from "../SearchIndex/Search";
import { ForwardSVG } from "../svg/SVGs";

import UserIndex from "../User/UserIndex";

export default function Header() {
  const location: Location = useLocation();
  const isSearchShown = location.pathname.includes("search");
  const navigate = useNavigate();

  const onBack = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    navigate(-1);
  };
  return (
    <header className="app-header">
      <button className="back-btn" onClick={onBack}>
        <ForwardSVG />
      </button>
      {isSearchShown && <Search />}

      <UserIndex navigate={navigate} />
    </header>
  );
}
