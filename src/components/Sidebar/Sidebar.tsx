import { useState } from "react";
import { NavBar } from "./NavBar";
import { UserLibraryIndex } from "./UserLibraryIndex";

export default function Sidebar() {
  const [isSmallSize, setIsSmallSize] = useState(true);
  console.log("isFullSize:", isSmallSize)

  const sideBarClassName = isSmallSize ? "side-bar small-size" : "side-bar";
  return (
    <section className={sideBarClassName}>
      <NavBar />
      <UserLibraryIndex setIsFullSize={setIsSmallSize} />
    </section>
  );
}
