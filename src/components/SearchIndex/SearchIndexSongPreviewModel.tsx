import { MouseEvent, useRef } from "react";
import { IPlaylistModelData } from "../../models/playlist.model";
import { ISongYT } from "../../models/song.model";
import { useModel } from "../../hooks/useModel";
import { useModelPosition } from "../../hooks/useModelPosition";
import { DotsSVG, ForwardSVG, ShareSVG } from "../svg/SVGs";
import SearchIndexSongPreviewModelSub from "./SearchIndexSongPreviewModelSub";

interface Props {
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  userPlaylistsForModel?: IPlaylistModelData[];
  song: ISongYT;
  playlistId?: string;
}
export default function SearchIndexSongPreviewModel({
  onSaveYTSong,
  userPlaylistsForModel,
  song,
  playlistId,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { modelPosition, handleMouseClick } = useModelPosition({ x: 0, y: 42 });

  const onModelBtnClick = (ev: MouseEvent) => {
    handleMouseClick(ev, { x: 0, y: -112 }, 102);
    setIsModelOpen(true);
  };

  return (
    <div className="search-index-songs-list-item-model-con" ref={modelRef}>
      <button className="song-model-btn" onClick={onModelBtnClick}>
        <DotsSVG />
      </button>
      {isModelOpen && (
        <ul style={{ top: modelPosition.y }} className="song-model-list">
          <SearchIndexSongPreviewModelSub
            onSaveYTSong={onSaveYTSong}
            userPlaylistsForModel={userPlaylistsForModel}
            song={song}
            playlistId={playlistId}
          />
          <li className="song-model-list-item">
            <button className="song-model-list-item-btn">
              <ShareSVG />
              <span>Share</span>
              <div className="svg-con-margin">
                <ForwardSVG />
              </div>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
