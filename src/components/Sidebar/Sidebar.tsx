import { useState } from "react";
import { NavBar } from "./NavBar";
import { UserLibraryIndex } from "./UserLibraryIndex";

export default function Sidebar() {
  const [isFullSize, setIsFullSize] = useState(true);

  const sideBarClassName = isFullSize ? "side-bar full-size" : "side-bar";
  return (
    <section className={sideBarClassName}>
      <NavBar />
      <UserLibraryIndex setIsFullSize={setIsFullSize} />
    </section>
  );
}
