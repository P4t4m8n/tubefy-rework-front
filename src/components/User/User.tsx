import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import NoUserBtn from "./NoUserBtn";
import { MouseEvent } from "react";
import { UserIconSVG } from "../svg/SVGs";

export function User() {
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  console.log("navigate:", navigate);

  async function onLogout(ev: MouseEvent) {
    ev.preventDefault();
  }

  if (!user) return <NoUserBtn />;

  const { avatarUrl } = user;

  return (
    <section className="user-nav">
      <button onClick={onLogout}>Logout</button>
      <div className="avatar">
        {avatarUrl ? <img src={avatarUrl}></img> : <UserIconSVG />}
      </div>
    </section>
  );
}
