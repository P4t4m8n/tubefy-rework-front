import { MouseEvent } from "react";
import { ForwardSVG, PlusSVG, SaveSVG } from "../svg/SVGs";
import { IPlaylistModelData } from "../../models/playlist.model";
import { addSongToPlaylist } from "../../store/actions/playlist.action";
import { ISong } from "../../models/song.model";
import { useModelPosition } from "../../hooks/useModelPosition";

interface Props {
  playlistModelData: IPlaylistModelData[];
  song: ISong;
}

export default function SongModelSub({ playlistModelData, song }: Props) {
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
        {playlistModelData &&
          playlistModelData.map((playlist) => (
            <li key={playlist.playlistsId}>
              <button
                onClick={() => addSongToPlaylist(playlist.playlistsId!, song)}
              >
                <SaveSVG />
                <span>{playlist.playlistsName}</span>
              </button>
            </li>
          ))}
      </ul>
    </li>
  );
}
