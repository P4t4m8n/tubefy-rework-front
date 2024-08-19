import { useAppSelector } from "../../hooks/useStore";
import { MouseEvent } from "react";
import { LogoutSVG, UserIconSVG } from "../svg/SVGs";
import Login from "./Login";
import { IGenericModelItem } from "../../models/app.model";
import GenericModel from "../GenericComponents/GenericModel";
import { logout } from "../../store/actions/user.action";

export function User() {
  const { user } = useAppSelector((state) => state.user);

  async function onLogout(ev?: MouseEvent) {
    if (!ev) return;
    ev.preventDefault();
    logout();
  }

  const userModelItems: IGenericModelItem[] = [
    {
      svg: <UserIconSVG />,
      text: "Profile",
      link: "/profile",
    },
    {
      svg: <LogoutSVG />,
      text: "Logout",
      onClick: onLogout,
    },
  ];
  const ifNoUserAvatar = !user?.imgUrl ? <UserIconSVG /> : undefined;
  return (
    <div className="header-user-btn">
      {!user && <Login />}
      {user && (
        <GenericModel
          imgUrl={user.imgUrl}
          items={userModelItems}
          btnSvg={ifNoUserAvatar}
        />
      )}
    </div>
  );
}
