import { NavBar } from "./NavBar";
import { UserLibraryIndex } from "./UserLibraryIndex";

export default function Sidebar() {
  return (
    <section className="side-bar ">
      <NavBar />
      <UserLibraryIndex />
    </section>
  );
}
