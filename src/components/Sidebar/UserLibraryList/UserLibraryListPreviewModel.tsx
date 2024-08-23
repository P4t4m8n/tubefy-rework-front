import { MouseEvent, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { DeleteSVG, DotsSVG, PencilSVG, ShareSVG } from "../../svg/SVGs";
import { useNavigate } from "react-router-dom";
import { deletePlaylist } from "../../../store/actions/playlist.action";

interface Props {
  playlistId: string;
}

export default function UserLibraryListPreviewModel({ playlistId }: Props) {
  const playlistModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(playlistModelRef);
  const navigate = useNavigate();

  const handleClick = async (
    ev: MouseEvent,
    type: "delete" | "share" | "edit"
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    switch (type) {
      case "delete":
        await deletePlaylist(playlistId);
        break;
      case "share":
        console.info("Share playlist");
        break;
      case "edit":
        navigate(`/playlist/edit/${playlistId}`);
        break;
      default:
        break;
    }
    setIsModelOpen(false);
  };
  return (
    <div ref={playlistModelRef} className="user-library-list-preview-model-con">
      <button
        className="user-library-list-preview-model-btn"
        onClick={() => setIsModelOpen((prev) => !prev)}
      >
        <DotsSVG />
      </button>
      {isModelOpen && (
        <div className="user-library-list-preview-model">
          <button onClick={(ev) => handleClick(ev, "delete")}>
            <span>Delete</span>
            <DeleteSVG />
          </button>
          <button onClick={(ev) => handleClick(ev, "share")}>
            <span>Share</span>
            <ShareSVG />
          </button>
          <button onClick={(ev) => handleClick(ev, "edit")}>
            <span>Edit</span>
            <PencilSVG />
          </button>
        </div>
      )}
    </div>
  );
}
