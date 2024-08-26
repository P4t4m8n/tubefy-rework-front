import { Outlet } from "react-router-dom";
import ProfileNav from "../components/ProfileIndex/ProfileNav";

export default function ProfileIndex() {
  return (
    <section className="profile-index">
      <ProfileNav />
      <Outlet />
    </section>
  );
}
