import { MouseEvent } from "react";
import { useModelPosition } from "../../hooks/useModelPosition";
import { IPlaylistModelData } from "../../models/playlist.model";
import { ISongYT } from "../../models/song.model";
import { ForwardSVG, PlusSVG, SaveSVG } from "../svg/SVGs";

interface Props {
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  userPlaylistsForModel: IPlaylistModelData[];
  song: ISongYT;
}
export default function SearchIndexSongPreviewModelSub({
  userPlaylistsForModel,
  song,
  onSaveYTSong,
}: Props) {
  const { modelPosition, handleMouseEnter } = useModelPosition({ x: 0, y: 0 });

  const onMouseEnter = (ev: MouseEvent) => {
    const left = ev.currentTarget.getBoundingClientRect().left;
    handleMouseEnter(ev, { x: left, y: -130 }, 220);
  };
  return (
    <li className="song-model-list-item" onMouseEnter={onMouseEnter}>
      <button className="song-model-list-item-btn">
        <PlusSVG />
        <span> Add to playlist</span>
        <div className="svg-con-margin">
          <ForwardSVG />
        </div>
      </button>
      <ul style={{ top: modelPosition.y }} className="items-model-list">
        {userPlaylistsForModel &&
          userPlaylistsForModel.map((playlist) => (
            <li key={playlist.playlistsId}>
              <button onClick={() => onSaveYTSong(song, playlist.playlistsId)}>
                <SaveSVG />
                <span>{playlist.playlistsName}</span>
              </button>
            </li>
          ))}
      </ul>
    </li>
  );
}
