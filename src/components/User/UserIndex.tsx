import { useAppSelector } from "../../hooks/useStore";
import { NavigateFunction } from "react-router-dom";
import Login from "./Login";
import UserSocketsListener from "./UserSocketsListener";
import UserMenu from "../Menus/UserMenu/UserMenu";

export default function UserIndex({
  navigate,
}: {
  navigate: NavigateFunction;
}) {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="header-user-btn">
      {!user && <Login />}
      {user && (
        <UserMenu
          username={user.username}
          imgUrl={user.imgUrl || "/default-user.png"}
          navigate={navigate}
        />
      )}
      <UserSocketsListener user={user} />
    </div>
  );
}
