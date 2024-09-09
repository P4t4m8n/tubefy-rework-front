import { MouseEvent, useCallback, useRef } from "react";
import { useModel } from "../src/hooks/useModel";
import { DeleteSVG, DotsSVG, PencilSVG } from "../src/components/svg/SVGs";
import { useNavigate } from "react-router-dom";
import { removePlaylist } from "../src/store/actions/playlist.action";
import UserLibraryListItemModelShare from "./UserLibraryListItemModelShare";
import { playlistService } from "../src/services/playlist.service";
import { utilService } from "../src/util/util.util";
import GenericModelBtn from "../src/components/Menus/GeneralBtn";
import { TNotificationType } from "../src/models/notification.model";
import GeneralBtn from "../src/components/Menus/GeneralBtn";

interface Props {
  playlistId: string;
  modelClass: string;
}

export default function UserLibraryListItemModel({
  playlistId,
  modelClass,
}: Props) {
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
        await removePlaylist(playlistId);
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
      action: (ev?: MouseEvent) => handleClick(ev!, "delete"),
    },
    {
      btnSvg: <PencilSVG />,
      text: "Edit",
      action: (ev?: MouseEvent) => handleClick(ev!, "edit"),
    },
  ];

  return (
    <div ref={playlistModelRef} className={`${modelClass}-con"`}>
      <GenericModelBtn
        className={`${modelClass}-btn`}
        btnSvg={<DotsSVG />}
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
      />

      {isModelOpen && (
        <ul className={modelClass}>
          {items.map((item, idx) => (
            <li key={idx}>
              <GeneralBtn
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
