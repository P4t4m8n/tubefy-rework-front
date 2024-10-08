import { Fragment, MouseEvent, RefObject, useRef } from "react";
import { ISong, ISongYT } from "../../../models/song.model";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { useModel } from "../../../hooks/useModel";
import { useModelPosition } from "../../../hooks/useModelPosition";
import { DeleteSVG, DotsSVG, PlusSVG, ShareSVG } from "../../svg/SVGs";
import GeneralBtn from "../GeneralBtn";
import {
  getFriendsState,
  getUserPlaylistsState,
} from "../../../store/getStore";
import { addSongToPlaylist } from "../../../store/actions/playlist.action";
import SongMenuSlide from "./SongMenuSlide";
import { utilService } from "../../../util/util.util";

interface Props {
  song: ISong | ISongYT;
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  onRemoveSongFromPlaylist?: (songId: string) => void;
  addSongToPlaylistEdit?: (song: ISong) => void;
  playlistId?: string;
}
export default function SongMenu({
  song,
  container,
  modelSize,
  onRemoveSongFromPlaylist,
  addSongToPlaylistEdit,
  playlistId,
}: Props) {
  const modelConRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLUListElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelConRef);
  const { modelPosition, handleMouseClick } = useModelPosition();

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    handleMouseClick(modelConRef, modelSize, container);
    setIsModelOpen((prev) => !prev);
  };

  const friends = getFriendsState();
  const playlists = getUserPlaylistsState();

  const shareItems = friends.map((friend) => ({
    text: friend.friend.username,
    imgUrl: friend.friend.imgUrl || "/default-user.png",
    onClick: () => console.info("share with friend"),
    modelSize: { width: 208, height: 144 },
  }));

  const addItems = playlists.map((playlist) => ({
    text: playlist.name,
    imgUrl: playlist.imgUrl || "/default-playlist.png",
    onClick: async () => {
      const newSong = await addSongToPlaylist(playlist.id, song!);
      if (playlistId && addSongToPlaylistEdit && playlistId === playlist.id) {
        addSongToPlaylistEdit(newSong!);
      }
      utilService.handleSuccess(
        "Song added to playlist",
        "PLAYLIST_SONG_ADD",
        newSong?.imgUrl
      );
      setIsModelOpen(false);
    },
    modelSize: { width: 208, height: 144 },
  }));

  const items: IModelItem[] = [
    {
      items: shareItems,
      text: "Share",
      btnSvg: <ShareSVG />,
      modelSize: { width: 208, height: 144 },
    },
    {
      items: addItems,
      text: "Add to Playlist",
      btnSvg: <PlusSVG />,
      modelSize: { width: 208, height: 144 },
    },
  ];

  if (onRemoveSongFromPlaylist) {
    items.push({
      btnSvg: <DeleteSVG />,
      text: "Delete",
      onClick: () => {
        onRemoveSongFromPlaylist((song as ISong).id);
        utilService.handleSuccess(
          "Song removed from playlist",
          "PLAYLIST_REMOVE_SONG",
          (song as ISong).imgUrl
        );
        setIsModelOpen(false);
      },
    });
  }

  return (
    <div ref={modelConRef} className="songs-model-con">
      <GeneralBtn
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
          ref={modelRef}
          className={"songs-model"}
        >
          {items.map((item, idx) => (
            <Fragment key={idx}>
              {!item.items ? (
                <li className={"songs-model-item"} key={idx}>
                  <GeneralBtn
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
                  parentRef={modelRef}
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
