import { MouseEvent, useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { DeleteSVG, DotsSVG, ForwardSVG, ShareSVG } from "../svg/SVGs";
import { ISong } from "../../models/song.model";
import { IPlaylistModelData } from "../../models/playlist.model";
import { useModelPosition } from "../../hooks/useModelPosition";
import SongModelSub from "./SongModelSub";

interface Props {
  song: ISong;
  isOwner: boolean;
  playlistModelData: IPlaylistModelData[];
  onRemoveSongFromPlaylist: (songId: string) => void;
}

export default function SongModel({
  song,
  playlistModelData,
  isOwner,
  onRemoveSongFromPlaylist,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { modelPosition, handleMouseClick } = useModelPosition({ x: 0, y: 32 });

  const onModelBtnClick = (ev: MouseEvent) => {
    handleMouseClick(ev, { x: 0, y: -112 }, 102);
    setIsModelOpen(true);
  };

  return (
    <div className="song-model" ref={modelRef}>
      <button className="song-model-btn" onClick={onModelBtnClick}>
        <DotsSVG />
      </button>
      {isModelOpen && (
        <ul style={{ top: modelPosition.y }} className="song-model-list">
          <SongModelSub playlistModelData={playlistModelData!} song={song} />

          <li className="song-model-list-item">
            <button className="song-model-list-item-btn">
              <ShareSVG />
              <span>Share</span>
              <div className="svg-con-margin">
                <ForwardSVG />
              </div>
            </button>
          </li>

          {isOwner && (
            <li className="song-model-list-item">
              <button
                onClick={() => onRemoveSongFromPlaylist(song.id)}
                className="song-model-list-item-btn"
              >
                <DeleteSVG />
                <span>Remove from playlist</span>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
