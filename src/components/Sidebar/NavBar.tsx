import { Link } from "react-router-dom";

import { useNavLocation } from "../../hooks/useLocation";

import {
  HomeClickedSVG,
  HomeSvg,
  SearchClickedSVG,
  SearchSvg,
} from "../svg/SVGs";

import NotificationsLink from "./NavBar/NotificationsLink";
import FriendsLink from "./NavBar/FriendsLink";

export default function NavBar() {
  const { location, checkLocation } = useNavLocation();
  const isSearchOpen = checkLocation("search");
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

      <FriendsLink checkLocation={checkLocation} />
      <NotificationsLink checkLocation={checkLocation} />
    </nav>
  );
}
