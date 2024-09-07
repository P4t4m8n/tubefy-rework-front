import { ArrowSVG, LibrarySVG } from "../../svg/SVGs";
import { getEmptyPlaylist } from "../../../util/playlist.util";
import { saveUserPlaylist } from "../../../store/actions/playlist.action";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";
import { getUserPlaylistsState, getUserState } from "../../../store/getStore";
import CreatePlaylistModel from "./CreatePlaylistModel";
import { utilService } from "../../../util/util.util";

interface Props {
  setIsFullSize: Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePlaylist({ setIsFullSize }: Props) {
  const navigate = useNavigate();

  const onCreatePlaylist = async () => {
    const user = getUserState();
    if (!user) return;

    const userPlaylistsLength = getUserPlaylistsState().length;
    const emptyPlaylist = getEmptyPlaylist(userPlaylistsLength);

    const { id, username, imgUrl } = user;
    emptyPlaylist.owner = { id, username, imgUrl };

    const savedPlaylist = await saveUserPlaylist(emptyPlaylist);
    if (!savedPlaylist) {
      utilService.handleError(
        "Failed to create playlist, please try again later.",
        "PLAYLIST_CREATE",
        "Playlist return undefined" as unknown as Error
      );
      return;
    }

    navigate(`/playlist/edit/${savedPlaylist.id}`);
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
