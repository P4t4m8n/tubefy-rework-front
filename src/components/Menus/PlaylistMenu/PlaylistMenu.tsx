import { Fragment, MouseEvent, RefObject, useCallback, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { useModelPosition } from "../../../hooks/useModelPosition";
import GenericBtn from "../../GenericComponents/GenericBtn";
import { DeleteSVG, DotsSVG, PencilSVG, ShareSVG } from "../../svg/SVGs";
import PlaylistMenuShare from "./PlaylistMenuShare";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { playlistService } from "../../../services/playlist.service";
import { utilService } from "../../../util/util.util";
import { removePlaylist } from "../../../store/actions/playlist.action";
import { useNavigate } from "react-router-dom";
import { getFriendsState } from "../../../store/getStore";

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
    onClick: () => onSharePlaylist(playlistId, friend.id),
    modelSize: { width: 208, height: 30 * 3 + 24 },
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
      <GenericBtn
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
                  <GenericBtn
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
