import { Link } from "react-router-dom";
import { INotification } from "../../../models/notification.model";
import {
  approveSharePlaylist,
  rejectSharedPlaylist,
} from "../../../store/actions/playlist.action";
import { utilService } from "../../../util/util.util";
import { useMemo, useRef } from "react";
import { IModelAction } from "../../../models/app.model";
import { CheckSVG, PlusSVG } from "../../svg/SVGs";
import GenericProfileModel from "../../GenericComponents/GenericProfileModel";
import { useModel } from "../../../hooks/useModel";

interface Props {
  data: INotification;
}

export default function SharePlaylistNotification({ data }: Props) {
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
        icon: <PlusSVG />,
      },
    ],
    []
  );

  const imgUrl =
    data?.fromUser?.imgUrl || data?.playlist?.imgUrl || "/success-img.jpg";
  const openClass = isModelOpen ? "open" : "";
  console.log("imgUrl:", imgUrl);
  console.log("data:", data)

  return (
    <li ref={modelRef} className={"share-playlist-notification " + openClass}>
      <img src={imgUrl}></img>
      <h3>{`${data.fromUser?.username} shared playlist ${data.playlist?.name} with you`}</h3>
      <Link to={`/playlist/${data.playlist?.id} `}></Link>
      <GenericProfileModel
        item={data}
        modelActions={modelActions}
        setModelOpen={setModelOpen}
      />
    </li>
  );
}
