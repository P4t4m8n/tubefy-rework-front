import { Location, useLocation, useNavigate } from "react-router-dom";
import { Search } from "../Search";
import User from "../User/User";
import { ForwardSVG } from "../svg/SVGs";
import { MouseEvent } from "react";

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

      <User navigate={navigate} />
    </header>
  );
}
