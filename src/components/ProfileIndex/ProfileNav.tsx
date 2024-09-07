import { Link, useLocation, Location } from "react-router-dom";

export default function ProfileNav() {
  const location: Location = useLocation();
  const route = location.pathname.split("/")[2];

  return (
    <nav className="profile-nav">
      <Link className={route === "details" ? "highlight" : ""} to={"details"}>
        <span>Profile</span>
      </Link>

      <Link className={route === "friends" ? "highlight" : ""} to={"friends"}>
        <span>Friends</span>
      </Link>

      <Link
        className={route === "notifications" ? "highlight" : ""}
        to={"notifications"}
      >
        <span>Notifications</span>
      </Link>
    </nav>
  );
}
