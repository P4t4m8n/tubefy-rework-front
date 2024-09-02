import { MouseEvent, useRef } from "react";
import { store } from "../../../store/store";
import { useModel } from "../../../hooks/useModel";
import GenericModelBtn from "../../GenericComponents/GenericBtn";
import { ShareSVG } from "../../svg/SVGs";

export default function UserLibraryListItemModelShare({
  handleClick,
}: {
  handleClick: (
    ev: MouseEvent,
    type: "share",
    friendId?: string
  ) => Promise<void>;
}) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const friends = store.getState().friends.friends;

  return (
    <li ref={modelRef} className="user-library-list-item-share-model-con">
      <GenericModelBtn
        btnSvg={<ShareSVG />}
        text="Share Playlist"
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
      />
      {isModelOpen && (
        <ul className="user-library-list-item-share-model">
          {friends.map((friend) => (
            <li key={friend.id}>
              <GenericModelBtn
                imgUrl={friend.friend?.imgUrl || "/default-user.png"}
                text={friend.friend.username}
                onModelBtnClick={(ev) => handleClick(ev, "share", friend.friend.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
