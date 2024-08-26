import { Link, useLocation, Location } from "react-router-dom";

export default function ProfileNav() {
  const location: Location = useLocation();
  const route = location.pathname.split("/")[2];

  return (
    <nav className="profile-nav">
      <Link to={"details"}>
        <span className={route === "details" ? "highlight" : ""}>Profile</span>
      </Link>

      <Link to={"friends"}>
        <span className={route === "friends" ? "highlight" : ""}>Friends</span>
      </Link>
    </nav>
  );
}
