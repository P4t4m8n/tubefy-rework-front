import { Link } from "react-router-dom";
import { LibrarySVG, PlusSVG } from "../svg/SVGs";

export default function CreatePlaylist() {
  return (
    <section className="creation-and-toggle ">
      <p className="your-library">
        <LibrarySVG />
        <span>Library</span>
      </p>
      <button className="mobile your-library ">
        <Link to={"/mobile/library"}>
          <LibrarySVG />
          <span>Library</span>
        </Link>
      </button>
      <div className="">
        <button className="">
          <PlusSVG />
        </button>
      </div>
    </section>
  );
}
