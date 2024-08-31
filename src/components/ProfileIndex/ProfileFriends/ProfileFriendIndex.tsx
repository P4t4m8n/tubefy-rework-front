import AddFriend from "./AddFriend";
import ProfileFriendList from "./ProfileFriendList";
import ProfileFriendRequests from "./ProfileFriendRequests";

export default function ProfileFriendIndex() {
  return (
    <section className="profile-friend-index">
      <AddFriend />
      <ProfileFriendList />
      <ProfileFriendRequests />
    </section>
  );
}
