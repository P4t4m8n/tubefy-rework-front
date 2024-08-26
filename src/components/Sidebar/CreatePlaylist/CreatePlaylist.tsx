import { ArrowSVG, LibrarySVG } from "../../svg/SVGs";
import { getEmptyPlaylist } from "../../../util/playlist.util";
import { saveUserPlaylist } from "../../../store/actions/playlist.action";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";
import { getUserPlaylistsState, getUserState } from "../../../store/getStore";
import CreatePlaylistModel from "./CreatePlaylistModel";
import { showUserMsg } from "../../../services/eventEmitter";

interface Props {
  setIsFullSize: Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePlaylist({ setIsFullSize }: Props) {
  const navigate = useNavigate();

  const onCreatePlaylist = async () => {
    try {
      const user = getUserState();
      if (!user) return;

      const userPlaylistsLength = getUserPlaylistsState().length;
      const emptyPlaylist = getEmptyPlaylist(userPlaylistsLength);
      emptyPlaylist.owner = user;

      const savedPlaylistId = await saveUserPlaylist(emptyPlaylist);

      if (!savedPlaylistId) throw new Error("Failed to save playlist");
      navigate(`/playlist/edit/${savedPlaylistId}`);
    } catch (error) {
      showUserMsg({
        text: "Failed to create playlist",
        type: "general-error",
        status: "error",
      });
    }
  };

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

      <CreatePlaylistModel onCreatePlaylist={onCreatePlaylist} />
    </section>
  );
}