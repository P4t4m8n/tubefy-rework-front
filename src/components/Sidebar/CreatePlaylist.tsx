import { LibrarySVG } from "../svg/SVGs";
import CreatePlaylistModel from "./CreatePlaylistModel";

export default function CreatePlaylist() {
  return (
    <section className="user-library-header">
      <button className="your-library">
        <LibrarySVG />
        <span>Your Library</span>
      </button>

      <CreatePlaylistModel />
    </section>
  );
}
