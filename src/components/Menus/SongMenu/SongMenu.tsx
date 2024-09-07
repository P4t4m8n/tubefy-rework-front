import { Fragment, MouseEvent, RefObject, useRef } from "react";
import { ISong, ISongYT } from "../../../models/song.model";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { useModel } from "../../../hooks/useModel";
import { useModelPosition } from "../../../hooks/useModelPosition";
import { DeleteSVG, DotsSVG, PlusSVG, ShareSVG } from "../../svg/SVGs";
import GenericBtn from "../../GenericComponents/GenericBtn";
import {
  getFriendsState,
  getUserPlaylistsState,
} from "../../../store/getStore";
import { addSongToPlaylist } from "../../../store/actions/playlist.action";
import SongMenuSlide from "./SongMenuSlide";

interface Props {
  song: ISong | ISongYT;
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  onRemoveSongFromPlaylist?: (songId: string) => void;
}
export default function SongMenu({
  song,
  container,
  modelSize,
  onRemoveSongFromPlaylist,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { modelPosition, handleMouseClick } = useModelPosition();

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    handleMouseClick(modelRef, modelSize, container);
    setIsModelOpen((prev) => !prev);
  };

  const friends = getFriendsState();
  const playlists = getUserPlaylistsState();

  const shareItems = friends.map((friend) => ({
    text: friend.friend.username,
    imgUrl: friend.friend.imgUrl || "/default-user.png",
    onClick: () => console.log("share with friend"),
    modelSize: { width: 208, height: 144 },
  }));

  const addItems = playlists.map((playlist) => ({
    text: playlist.name,
    imgUrl: playlist.imgUrl || "/default-playlist.png",
    onClick: () => addSongToPlaylist(playlist.id, song),
    modelSize: { width: 208, height: 144 },
  }));
  const items: IModelItem[] = [
    {
      items: shareItems,
      text: "Share",
      btnSvg: <ShareSVG />,
      modelSize: { width: 208, height: 184 },
    },
    {
      items: addItems,
      text: "Add to Playlist",
      btnSvg: <PlusSVG />,
      modelSize: { width: 208, height: 184 },
    },
  ];

  if (onRemoveSongFromPlaylist) {
    items.push({
      btnSvg: <DeleteSVG />,
      text: "Delete",
      onClick: () => onRemoveSongFromPlaylist((song as ISong).id),
    });
  }

  return (
    <div ref={modelRef} className="songs-model-con">
      <GenericBtn
        className="songs-model-btn"
        btnSvg={<DotsSVG />}
        onModelBtnClick={onOpenModel}
      />
      {isModelOpen && (
        <ul
          style={{
            top: modelPosition.height,
            left: modelPosition.width,
          }}
          className={"songs-model"}
        >
          {items.map((item, idx) => (
            <Fragment key={idx}>
              {!item.items ? (
                <li className={"songs-model-item"} key={idx}>
                  <GenericBtn
                    btnSvg={item.btnSvg!}
                    text={item.text}
                    onModelBtnClick={item.onClick!}
                    className={"songs-model-item-btn"}
                  />
                </li>
              ) : (
                <SongMenuSlide
                  key={idx}
                  container={container}
                  modelClass={"songs-model-item"}
                  imgUrl={item.imgUrl}
                  items={item.items}
                  modelSize={item.modelSize!}
                  text={item.text}
                  btnSvg={item.btnSvg}
                />
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
