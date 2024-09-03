import { Link } from "react-router-dom";
import { INotification } from "../../../models/notification.model";
import {
  approveSharePlaylist,
  rejectSharedPlaylist,
} from "../../../store/actions/playlist.action";
import { utilService } from "../../../util/util.util";
import { useMemo, useRef } from "react";
import { IModelAction } from "../../../models/app.model";
import { CheckSVG, RejectSVG } from "../../svg/SVGs";
import GenericProfileModel from "../../GenericComponents/GenericProfileModel";
import { useModel } from "../../../hooks/useModel";

interface Props {
  notification: INotification;
}

export default function SharePlaylistNotification({ notification }: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setModelOpen] = useModel(modelRef);
  const handleClick = async (
    approve: boolean,
    notificationId?: string,
    playlistId?: string
  ) => {

    if (!playlistId || !notificationId) {
      utilService.handleError(
        "Playlist not found",
        "PLAYLIST_SHARE",
        new Error("Playlist not found or notification id not found")
      );
      return;
    }
    if (approve) {
      await approveSharePlaylist(playlistId, notificationId);
      utilService.handleSuccess(
        "Playlist added to your library",
        "PLAYLIST_SHARE"
      );
      return;
    }

    await rejectSharedPlaylist(playlistId, notificationId);
    utilService.handleSuccess("Playlist rejected", "PLAYLIST_SHARE");
    return;
  };

  const modelActions: IModelAction<INotification>[] = useMemo(
    () => [
      {
        text: "APPROVE",
        action: ({ playlist, id }) => {
          handleClick(true, id, playlist?.id);
        },
        icon: <CheckSVG />,
      },
      {
        text: "REJECT",
        action: ({ playlist, id }) => {
          handleClick(false, id, playlist?.id);
        },
        icon: <RejectSVG />,
      },
    ],
    []
  );

  const openClass = isModelOpen ? "open" : "";
  const { text, imgUrl, playlist } = notification;
  const playlistId = playlist?.id;

  return (
    <li ref={modelRef} className={"notification-list-item share " + openClass}>
      <img src={imgUrl}></img>
      <h3>{text}</h3>
      <Link to={`/playlist/${playlistId} `}>{playlist?.name}</Link>
      <GenericProfileModel
        item={notification}
        modelActions={modelActions}
        setModelOpen={setModelOpen}
      />
    </li>
  );
}
