import { useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { CreatePlaylistSVG, PlusSVG } from "../../svg/SVGs";

interface Props {
  onCreatePlaylist: () => Promise<void>;
}
export default function CreatePlaylistModel({ onCreatePlaylist }: Props) {
  const createPlaylistModel = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(createPlaylistModel);
  return (
    <div className="create-playlist-model-con" ref={createPlaylistModel}>
      <button
        onClick={() => setIsModelOpen((prev) => !prev)}
        className="create-playlist-model-btn"
      >
        <PlusSVG />
      </button>

      {isModelOpen && (
        <div className="create-playlist-model">
          <button onClick={onCreatePlaylist}>
            <span>Create a new playlist</span>
            <CreatePlaylistSVG />
          </button>
        </div>
      )}
    </div>
  );
}
