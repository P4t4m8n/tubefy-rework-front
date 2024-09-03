import { Link, Location } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import { FriendsSVG } from "../../svg/SVGs";

interface Props {
  location: Location;
}
export default function FriendsLink({ location }: Props) {
  const friendsRequestLength =
    useAppSelector((state) => state.friends.friendsRequest.length) || 0;

  const isFriendsOpen = location.pathname.includes("friends");

  return (
    <Link
      to={"/profile/friends"}
      className={`sidebar-nav-link ${
        isFriendsOpen && "link-clicked notification"
      }`}
    >
      <FriendsSVG />
      <span>Friends</span>
      {friendsRequestLength > 0 && (
        <span className="notification-badge">{friendsRequestLength}</span>
      )}
    </Link>
  );
}
