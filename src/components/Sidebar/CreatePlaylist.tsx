import { IGenericModelItem } from "../../models/app.model";
import GenericModel from "../GenericComponents/GenericModel";
import { CreatePlaylistSVG, LibrarySVG, PlusSVG } from "../svg/SVGs";
import { store } from "../../store/store";
import { getEmptyPlaylist } from "../../util/playlist.util";
import { saveUserPlaylist } from "../../store/actions/playlist.action";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";

interface Props {
  setIsFullSize: Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePlaylist({ setIsFullSize }: Props) {
  const navigate = useNavigate();

  const onCreatePlaylist = async () => {
    try {
      const user = { ...store.getState().user.user! };
      if (!user) return;
      const userPlaylistsLength =
        store.getState().playlists.userPlaylists.length;
      const emptyPlaylist = getEmptyPlaylist(userPlaylistsLength);
      emptyPlaylist.owner = user;
      const savedPlaylistId = await saveUserPlaylist(emptyPlaylist);
      if (!savedPlaylistId) return;
      navigate(`/playlist/edit/${savedPlaylistId}`);
    } catch (error) {
      console.error(`Error while creating playlist: ${error}`);
    }
  };

  const items: IGenericModelItem[] = [
    {
      svg: <CreatePlaylistSVG />,
      text: "Create a new playlist",
      onClick: onCreatePlaylist,
    },
  ];
  return (
    <section className="user-library-header">
      <button
        onClick={() => setIsFullSize((prev) => !prev)}
        className="your-library"
      >
        <LibrarySVG />
        <span>Your Library</span>
      </button>

      <GenericModel items={items} btnSvg={<PlusSVG />} />
    </section>
  );
}
