import { Link, useLocation, Location } from "react-router-dom";
import { profileLinks } from "../../util/constants.util";

export default function ProfileNav() {
  const location: Location = useLocation();
  const route = location.pathname.split("/")[2];
  const links = profileLinks;

  return (
    <nav className="profile-nav">
      {links.map((link) => (
        <Link key={link} className={route === link ? "highlight" : ""} to={link}>
          <span>{link.charAt(0).toUpperCase() + link.slice(1)}</span>
        </Link>
      ))}
    </nav>
  );
}
