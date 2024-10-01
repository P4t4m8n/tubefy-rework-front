import { ArrowSVG, LibrarySVG } from "../../svg/SVGs";
import { Dispatch } from "react";
import CreatePlaylistModel from "./CreatePlaylistModel";

interface Props {
  setIsFullSize: Dispatch<React.SetStateAction<boolean>>;
  userPlaylistLength: number;
  isUser: boolean;
}

export default function CreatePlaylist({
  setIsFullSize,
  userPlaylistLength,
  isUser,
}: Props) {
  return (
    <section className="user-library-header">
      <button
        onClick={() => setIsFullSize((prev) => !prev)}
        className="your-library-btn"
      >
        <LibrarySVG />
        <span>Your Library</span>
        <ArrowSVG />
      </button>

      {isUser && (
        <CreatePlaylistModel userPlaylistLength={userPlaylistLength} />
      )}
    </section>
  );
}
