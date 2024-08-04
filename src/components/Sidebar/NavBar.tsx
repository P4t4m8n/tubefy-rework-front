import { Link, Location, useLocation } from "react-router-dom";
import {
  HomeClickedSVG,
  HomeSvg,
  SearchClickedSVG,
  SearchSvg,
} from "../svg/SVGs";

export function NavBar() {
  const location: Location = useLocation();
  const isSearchOpen = location.pathname.includes("search");

  return (
    <nav className="sidebar-nav">
      <Link
        to={"/"}
        className={`sidebar-nav-link ${isSearchOpen ? "" : "link-clicked"}`}
      >
        {isSearchOpen ? <HomeSvg /> : <HomeClickedSVG />}
        <span>Home</span>
      </Link>

      <Link
        to={"/search"}
        className={`sidebar-nav-link ${!isSearchOpen ? "" : "link-clicked"}`}
      >
        {!isSearchOpen ? <SearchSvg /> : <SearchClickedSVG />}
        <span>Search</span>
      </Link>
    </nav>
  );
}
