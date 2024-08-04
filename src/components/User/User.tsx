import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import { MouseEvent } from "react";
import { UserIconSVG } from "../svg/SVGs";
import Login from "./Login";

export function User() {
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  async function onLogout(ev: MouseEvent) {
    ev.preventDefault();
  }

  return (
    <>
      {!user && <Login />}
      {user && (
        <button onClick={onLogout}>
          {user.avatarUrl ? <img src={user.avatarUrl}></img> : <UserIconSVG />}
        </button>
      )}
    </>
  );
}
