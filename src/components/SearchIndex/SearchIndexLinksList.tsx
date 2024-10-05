import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { ForwardSVG } from "../svg/SVGs";

interface Props {
  links: readonly string[];
  type: "Genres" | "Types";
}

export default function SearchIndexLinksList({ links, type }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const { backVisible, onScrollBy } = useScroll(navRef);
  return (
    <section className="search-index-links-list">
      <h2>{type}</h2>

      <div className="nav-con">
        <button
          disabled={!backVisible}
          className={backVisible ? "visible" : ""}
          onClick={() => onScrollBy(-1)}
        >
          <ForwardSVG />
        </button>

        <nav ref={navRef}>
          {links.map((link) => (
            <Link key={link} to={`/search/${type.toLowerCase()}/${link}`}>
              {link}
            </Link>
          ))}
        </nav>
        <button onClick={() => onScrollBy(1)}>
          <ForwardSVG />
        </button>
      </div>
    </section>
  );
}
