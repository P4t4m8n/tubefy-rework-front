import { IModelAction } from "../../../models/app.model";
import { IFriend } from "../../../models/friend.model";
import { IUserSmall } from "../../../models/user.model";
import FriendPreview from "./FriendPreview";

interface Props {
  friendList: IUserSmall[] | IFriend[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelActions: IModelAction<any>[];
  title?: string;
}
export default function FriendsList({
  friendList,
  modelActions,
  title,
}: Props) {
  return (
    <section className="profile-friend-list">
      {title && <h2>{title}</h2>}
      <ul className="friends-list">
        {friendList.map((friend) => (
          <FriendPreview
            friend={friend}
            key={friend.id}
            modelActions={modelActions}
          />
        ))}
      </ul>
    </section>
  );
}
