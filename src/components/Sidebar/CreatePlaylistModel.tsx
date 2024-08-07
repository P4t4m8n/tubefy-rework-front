import { useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { CreatePlaylistSVG, PlusSVG } from "../svg/SVGs";
import { Link } from "react-router-dom";

export default function CreatePlaylistModel() {
  const modelRef = useRef<HTMLUListElement>(null);

  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  return (
    <>
      <button
        className="create-playlist-model-btn"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsModelOpen(true);
        }}
      >
        <PlusSVG />
      </button>
      {isModelOpen && (
        <ul className="create-playlist-model" ref={modelRef}>
          <li>
            <Link to="/playlist/edit">
              <span>Create a new playlist</span>
              <CreatePlaylistSVG />
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
