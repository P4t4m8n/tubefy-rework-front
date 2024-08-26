import { Link, Location, useLocation } from "react-router-dom";
import {
  FriendsSVG,
  HomeClickedSVG,
  HomeSvg,
  SearchClickedSVG,
  SearchSvg,
} from "../svg/SVGs";

export function NavBar() {
  const location: Location = useLocation();
  const isSearchOpen = location.pathname.includes("search");
  const isProfileOpen = location.pathname.includes("profile");

  return (
    <nav className="sidebar-nav">
      <Link
        to={"/"}
        className={`sidebar-nav-link ${
          isSearchOpen && !isProfileOpen ? "" : "link-clicked"
        }`}
      >
        {isSearchOpen ? <HomeSvg /> : <HomeClickedSVG />}
        <span>Home</span>
      </Link>

      <Link
        to={"/search"}
        className={`sidebar-nav-link ${
          !isSearchOpen && !isProfileOpen ? "" : "link-clicked"
        }`}
      >
        {!isSearchOpen ? <SearchSvg /> : <SearchClickedSVG />}
        <span>Search</span>
      </Link>

      <Link
        to={"/profile/friends"}
        className={`sidebar-nav-link ${!isProfileOpen ? "" : "link-clicked"}`}
      >
        <FriendsSVG />
        <span>Friends</span>
      </Link>
    </nav>
  );
}
