import { MouseEvent, useCallback, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { DeleteSVG, DotsSVG, PencilSVG } from "../../svg/SVGs";
import { useNavigate } from "react-router-dom";
import { deletePlaylist } from "../../../store/actions/playlist.action";
import UserLibraryListItemModelShare from "./UserLibraryListItemModelShare";
import { playlistService } from "../../../services/playlist.service";
import { utilService } from "../../../util/util.util";
import GenericModelBtn from "../../GenericComponents/GenericBtn";
import { TNotificationType } from "../../../models/notification.model";

interface Props {
  playlistId: string;
}

export default function UserLibraryListItemModel({ playlistId }: Props) {
  const playlistModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(playlistModelRef);
  const navigate = useNavigate();

  const handleClick = async (
    ev: MouseEvent,
    type: "delete" | "share" | "edit",
    friendId?: string
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    switch (type) {
      case "delete":
        await deletePlaylist(playlistId);
        break;
      case "share":
        onSharePlaylist(playlistId, friendId);
        break;
      case "edit":
        navigate(`/playlist/edit/${playlistId}`);
        break;
      default:
        break;
    }
    setIsModelOpen(false);
    if (type === "edit") return;
    const notificationType = `playlist-${type}`.toUpperCase();
    utilService.handleSuccess(type, notificationType as TNotificationType);
  };

  const onSharePlaylist = useCallback(
    async (playlistId: string, friendId?: string) => {
      try {
        if (!friendId) throw new Error("Friend not found");
        await playlistService.sharePlaylist(playlistId, friendId);
        utilService.handleSuccess("Playlist shared", "PLAYLIST_SHARE");
      } catch (error) {
        utilService.handleError(
          "playlist-share",
          "PLAYLIST_SHARE",
          error as Error
        );
      }
    },
    []
  );

  const items = [
    {
      btnSvg: <DeleteSVG />,
      text: "Delete",
      action: (ev: MouseEvent) => handleClick(ev, "delete"),
    },
    {
      btnSvg: <PencilSVG />,
      text: "Edit",
      action: (ev: MouseEvent) => handleClick(ev, "edit"),
    },
  ];

  return (
    <div ref={playlistModelRef} className="user-library-list-item-model-con">
      <GenericModelBtn
        className="user-library-list-item-model-btn"
        btnSvg={<DotsSVG />}
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
      />

      {isModelOpen && (
        <ul className="user-library-list-item-model">
          {items.map((item, idx) => (
            <li key={idx}>
              <GenericModelBtn
                btnSvg={item.btnSvg}
                text={item.text}
                onModelBtnClick={item.action}
              />
            </li>
          ))}
          <UserLibraryListItemModelShare handleClick={handleClick} />
        </ul>
      )}
    </div>
  );
}
