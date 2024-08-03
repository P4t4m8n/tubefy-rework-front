import { Location, useLocation } from "react-router-dom";
import { Search } from "../Search";
import { User } from "../User/User";

export default function Header() {
  const location: Location = useLocation();
  const isSearchShown = location.pathname.includes("search");
  return (
    <header className="app-header">
      {isSearchShown && <Search />}
      <User />
    </header>
  );
}
