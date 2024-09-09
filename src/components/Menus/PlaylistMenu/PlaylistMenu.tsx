import { Fragment, MouseEvent, RefObject, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useModel } from "../../../hooks/useModel";
import { useModelPosition } from "../../../hooks/useModelPosition";
import { DeleteSVG, DotsSVG, PencilSVG, ShareSVG } from "../../svg/SVGs";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { utilService } from "../../../util/util.util";
import {
  removePlaylist,
  sharePlaylist,
} from "../../../store/actions/playlist.action";
import { getFriendsState } from "../../../store/getStore";

import PlaylistMenuShare from "./PlaylistMenuShare";
import GeneralBtn from "../GeneralBtn";

interface Props {
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  playlistId: string;
}

export default function PlaylistMenu({
  container,
  modelSize,
  playlistId,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  const { modelPosition, handleMouseClick } = useModelPosition();

  const navigate = useNavigate();

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    handleMouseClick(modelRef, modelSize, container);
    setIsModelOpen((prev) => !prev);
  };

  const onSharePlaylist = useCallback(
    (friendId?: string) => sharePlaylist(playlistId, friendId),
    [playlistId]
  );

  const onRemovePlaylist = useCallback(
    async (playlistId: string) => {
      await removePlaylist(playlistId);
      utilService.handleSuccess("Playlist removed", "PLAYLIST_DELETE");
      navigate("/");
    },
    [navigate]
  );

  const onNavigateToEdit = useCallback(
    (playlistId: string) => {
      navigate(`/playlist/edit/${playlistId}`);
      return;
    },
    [navigate]
  );

  const friends = getFriendsState();

  const shareItems = friends.map((friend) => ({
    text: friend.friend.username,
    imgUrl: friend.friend.imgUrl || "/default-user.png",
    onClick: () => onSharePlaylist(friend.id),
    modelSize: { width: 208, height: 164 },
  }));

  const items: IModelItem[] = [
    {
      btnSvg: <DeleteSVG />,
      text: "Delete",
      onClick: () => onRemovePlaylist(playlistId),
    },
    {
      btnSvg: <PencilSVG />,
      text: "Edit",
      onClick: () => onNavigateToEdit(playlistId),
    },
    {
      items: shareItems,
      text: "Share",
      btnSvg: <ShareSVG />,
      modelSize: { width: 208, height: 30 * 3 + 24 },
    },
  ];

  return (
    <div ref={modelRef} className="playlists-model-con">
      <GeneralBtn
        className="playlists-model-btn"
        btnSvg={<DotsSVG />}
        onModelBtnClick={onOpenModel}
      />

      {isModelOpen && (
        <ul
          style={{
            top: modelPosition.height,
            left: modelPosition.width,
          }}
          className={"playlists-model"}
        >
          {items.map((item, idx) => (
            <Fragment key={idx}>
              {!item?.items ? (
                <li className={"playlists-model-item"} key={idx + 500}>
                  <GeneralBtn
                    btnSvg={item.btnSvg!}
                    text={item.text}
                    onModelBtnClick={item.onClick!}
                    className={"playlists-model-item-btn"}
                  />
                </li>
              ) : (
                <PlaylistMenuShare
                  key={idx + 100}
                  container={container}
                  modelClass={"playlists-model-item"}
                  items={item.items}
                  modelSize={modelSize}
                  elKey={idx}
                />
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
