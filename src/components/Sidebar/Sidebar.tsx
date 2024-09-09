import { useState } from "react";
import { NavBar } from "./NavBar";
import { UserLibraryIndex } from "./UserLibraryIndex";

export default function Sidebar() {
  const [isFullSize, setIsFullSize] = useState(true);

  const sideBarClassName = `side-bar ${isFullSize ? "full-size" : ""}`;
  return (
    <section className={sideBarClassName}>
      <NavBar />
      <UserLibraryIndex setIsFullSize={setIsFullSize} />
    </section>
  );
}
