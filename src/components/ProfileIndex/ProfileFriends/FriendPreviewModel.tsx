/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModelAction } from "../../../models/app.model";
import { Link } from "react-router-dom";
import { IUserSmall } from "../../../models/user.model";
import { IFriend } from "../../../models/friend.model";
import { ArrowSVG } from "../../svg/SVGs";

interface Props {
  modelActions: IModelAction<any>[];
  friend: IUserSmall | IFriend;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FriendPreviewModel({
  modelActions,
  friend,
  setModelOpen,
}: Props) {
  return (
    <section className="friend-preview-model-con">
      <ul className="friend-preview-model">
        {modelActions.map((action, i) => (
          <li className="friend-preview-model-item" key={i}>
            {action.action ? (
              <button
                className="friend-preview-model-item-action"
                onClick={(ev) => action.action!(ev, friend)}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ) : (
              <Link to={action.link!}>
                {action.icon}
                <span>{action.text}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <button
        className="friend-preview-model-btn"
        onClick={() => setModelOpen((prev) => !prev)}
      >
        <ArrowSVG />
      </button>
    </section>
  );
}
