import { useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { CreatePlaylistSVG, PlusSVG } from "../../svg/SVGs";
import GeneralBtn from "../../Menus/GeneralBtn";
import { useNavigate } from "react-router-dom";
import { createUserPlaylist } from "../../../store/actions/playlist.action";

interface Props {
  userPlaylistLength: number;
}
export default function CreatePlaylistModel({ userPlaylistLength }: Props) {
  const createPlaylistModel = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(createPlaylistModel);
  const navigate = useNavigate();

  const onCreatePlaylist = async () => {
    const playlistId = await createUserPlaylist(userPlaylistLength);
    setIsModelOpen(false);
    navigate(`/playlist/edit/${playlistId}`);
  };

  return (
    <div className="create-playlist-model-con" ref={createPlaylistModel}>
      <GeneralBtn
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
        btnSvg={<PlusSVG />}
        className="create-playlist-model-btn"
      />

      {isModelOpen && (
        <div className="create-playlist-model">
          <GeneralBtn
            onModelBtnClick={onCreatePlaylist}
            text="Create a new playlist"
            btnSvg={<CreatePlaylistSVG />}
            className=""
          />
        </div>
      )}
    </div>
  );
}
