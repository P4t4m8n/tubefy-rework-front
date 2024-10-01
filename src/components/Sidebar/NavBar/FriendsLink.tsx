import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useStore";
import { FriendsSVG } from "../../svg/SVGs";

interface Props {
  checkLocation: (path: string) => boolean;
}
export default function FriendsLink({ checkLocation }: Props) {
  const friendsRequestLength =
    useAppSelector((state) => state.friends.friendsRequest.length) || 0;

  const isFriendsOpen = checkLocation("friends");

  return (
    <Link
      to={"/profile/friends"}
      className={`sidebar-nav-link ${
        isFriendsOpen && "link-clicked"
      } notification`}
    >
      <FriendsSVG />
      <span>Friends</span>
      {friendsRequestLength > 0 && (
        <span className="notification-badge">{friendsRequestLength}</span>
      )}
    </Link>
  );
}
