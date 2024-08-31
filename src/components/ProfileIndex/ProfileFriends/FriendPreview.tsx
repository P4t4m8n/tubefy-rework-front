import { useRef } from "react";
import { IModelAction } from "../../../models/app.model";
import { IFriend } from "../../../models/friend.model";
import { IUserSmall } from "../../../models/user.model";
import { UserIconSVG } from "../../svg/SVGs";
import FriendPreviewModel from "./FriendPreviewModel";
import { useModel } from "../../../hooks/useModel";

interface Props {
  friend: IUserSmall | IFriend;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelActions: IModelAction<any>[];
}
export default function FriendPreview({ friend, modelActions }: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setModelOpen] = useModel(modelRef);
  let data: {
    username: string;
    id: string;
    imgUrl?: string;
    status?: string;
  };

  if ("status" in friend) {
    const { username, id, imgUrl } = (friend as IFriend).friend;
    data = { username, id, imgUrl, status: (friend as IFriend).status };
  } else {
    const { username, id, imgUrl } = friend as IUserSmall;
    data = { username, id, imgUrl };
  }

  const openClass = isModelOpen ? "open" : "";
  return (
    <li className={"friend-preview " + openClass} ref={modelRef}>
      {data.imgUrl ? (
        <img src={data.imgUrl} alt={data.username}></img>
      ) : (
        <UserIconSVG />
      )}
      <h3>{data.username}</h3>
      {data.status && <h4 className={data.status}>{data.status}</h4>}
      <FriendPreviewModel
        setModelOpen={setModelOpen}
        modelActions={modelActions}
        friend={friend}
      />
    </li>
  );
}
