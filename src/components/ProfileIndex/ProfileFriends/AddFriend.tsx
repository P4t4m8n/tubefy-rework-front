import { useCallback, useMemo, useRef, useState } from "react";
import { IUserSmall } from "../../../models/user.model";
import { userService } from "../../../services/user.service";
import { utilService } from "../../../util/util.util";
import { IModelAction } from "../../../models/app.model";
import { AddFriendSVG, MessageSVG, PlusSVG } from "../../svg/SVGs";
import { addFriend } from "../../../store/actions/friend.action";
import { useModel } from "../../../hooks/useModel";
import FriendsList from "./FriendsList";
import { IFriend } from "../../../models/friend.model";

export default function AddFriend() {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const [searchFriends, setSearchFriends] = useState<IUserSmall[]>([]);

  const getSearchFriends = useCallback(async (value: string) => {
    try {
      const isEmail = value.includes("@");

      const filter = isEmail ? { email: value } : { username: value };

      const _searchFriends = await userService.query(filter);
      setSearchFriends(_searchFriends);
    } catch (error) {
      utilService.handleError(
        "Error in searching friends",
        "GENERAL_ERROR",
        error as Error
      );
    }
  }, []);

  const debouncedGetSearchFriends = useMemo(
    () => utilService.debounce(getSearchFriends, 2000),
    [getSearchFriends]
  );

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    debouncedGetSearchFriends(value);
  };

  const onAddFriend = async (friendId?: string) => {
    if (!friendId) {
      utilService.handleError(
        "Error in adding friend",
        "GENERAL_ERROR",
        new Error("No friend id")
      );
      return;
    }
    await addFriend(friendId);
  };

  const modelActions: IModelAction<IFriend | IUserSmall>[] = useMemo(
    () => [
      {
        text: "ADD",
        action: (friend) => {
          onAddFriend(friend.id);
        },
        icon: <PlusSVG />,
      },
      {
        text: "MESSAGE",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        action: (_ev, _friendId) => {
          //TODO - add message action
        },
        icon: <MessageSVG />,
      },
    ],
    []
  );
  const openClass = isModelOpen ? "add-open" : "";

  return (
    <section ref={modelRef} className={"add-friend-model-con " + openClass}>
      <button
        className="add-friend-model-btn"
        onClick={() => setIsModelOpen(true)}
      >
        <AddFriendSVG />
        <h3>Add friend</h3>
        <h4>Search Email or user name</h4>
      </button>
      {isModelOpen && (
        <>
          <div className="input-con">
            <input
              type="search"
              placeholder="Search friends"
              onChange={handleChange}
            />
          </div>

          {!!searchFriends && (
            <FriendsList
              title="FriendsSearch"
              modelActions={modelActions}
              friendList={searchFriends}
            />
          )}
        </>
      )}
    </section>
  );
}
