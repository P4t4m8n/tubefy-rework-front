import { Link, Location, useLocation } from "react-router-dom";
import { HomeSvg, SearchSvg } from "../svg/SVGs";

export function NavBar() {
  const location: Location = useLocation();
  const isSearchOpen = location.pathname.includes("search");

  return (
    <ul className="sidebar-header">
      <li>
        <Link
          to={"/"}
          className={`sidebar-header-link ${
            isSearchOpen ? "" : "link-clicked"
          }`}
        >
          <HomeSvg></HomeSvg>
          <span>Home</span>
        </Link>
      </li>

      <li>
        <Link
          to={"/search"}
          className={`sidebar-header-link ${
            !isSearchOpen ? "" : "link-clicked"
          }`}
        >
          <SearchSvg></SearchSvg>
          <span>Search</span>
        </Link>
      </li>
    </ul>
  );
}
