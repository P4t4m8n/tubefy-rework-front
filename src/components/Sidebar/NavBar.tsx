import { Link, Location, useLocation } from "react-router-dom";
import {
  HomeClickedSVG,
  HomeSvg,
  SearchClickedSVG,
  SearchSvg,
} from "../svg/SVGs";
import NotificationsLink from "./NavBar/NotificationsLink";
import FriendsLink from "./NavBar/FriendsLink";

export function NavBar() {
  const location: Location = useLocation();
  const isSearchOpen = location.pathname.includes("search");
  const isHome = location.pathname === "/";

  return (
    <nav className="sidebar-nav">
      <Link to={"/"} className={`sidebar-nav-link ${isHome && "link-clicked"}`}>
        {isHome ? <HomeClickedSVG /> : <HomeSvg />}
        <span>Home</span>
      </Link>

      <Link
        to={"/search"}
        className={`sidebar-nav-link ${isSearchOpen && "link-clicked"}`}
      >
        {isSearchOpen ? <SearchClickedSVG /> : <SearchSvg />}
        <span>Search</span>
      </Link>

      <FriendsLink location={location} />
      <NotificationsLink location={location} />
    </nav>
  );
}
