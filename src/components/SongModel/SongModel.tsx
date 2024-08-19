import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { useModel } from "../../hooks/useModel";
import {
  DeleteSVG,
  DotsSVG,
  ForwardSVG,
  PlusSVG,
  SaveSVG,
  ShareSVG,
} from "../svg/SVGs";
import { ISong } from "../../models/song.model";
import {
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../../store/actions/playlist.action";
import { IPlaylistDetailed } from "../../models/playlist.model";

interface Props {
  playlistId?: string;
  song: ISong;
  setPlaylist: Dispatch<SetStateAction<IPlaylistDetailed | null>>;
  isOwnerId: string;
  userPlaylistsData?: {
    playlistsId?: string;
    playlistsName: string;
    playlistImg: string;
  }[];
}

export default function SongModel({
  song,
  userPlaylistsData,
  isOwnerId,
  playlistId,
  setPlaylist,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const [modelPosition, setModelPosition] = useState({ x: 0, y: "2rem" });
  const [subModelPosition, setSubModelPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (ev: MouseEvent) => {
    const position = ev.currentTarget.getBoundingClientRect();
    if (position.bottom + 220 > window.innerHeight) {
      setSubModelPosition({ x: position.left, y: -130 });
    }
  };

  const handleMouseClick = (ev: MouseEvent) => {
    const position = ev.currentTarget.getBoundingClientRect();
    if (position.bottom + 102 > window.innerHeight) {
      setModelPosition({ x: position.left, y: `${-7}rem` });
    }

    setIsModelOpen(true);
  };

  const onRemoveSongFromPlaylist = async () => {
    await removeSongFromPlaylist(playlistId!, song.id, isOwnerId);
    setPlaylist((prev) => {
      if (!prev) return prev;
      const updatedSongs = prev.songs.filter((_song) => _song.id !== song.id);
      return { ...prev, songs: updatedSongs };
    });
  };
  return (
    <div className="song-model" ref={modelRef}>
      <button className="song-model-btn" onClick={handleMouseClick}>
        <DotsSVG />
      </button>
      {isModelOpen && (
        <ul style={{ top: modelPosition.y }} className="song-model-list">
          <li className="song-model-list-item" onMouseEnter={handleMouseEnter}>
            <button className="song-model-list-item-btn">
              <PlusSVG />
              <span> Add to playlist</span>
              <div className="svg-con-margin">
                <ForwardSVG />
              </div>
            </button>
            <ul
              style={{ top: subModelPosition.y }}
              className="items-model-list"
            >
              {userPlaylistsData &&
                userPlaylistsData.map((playlist) => (
                  <li key={playlist.playlistsId}>
                    <button
                      onClick={() =>
                        addSongToPlaylist(playlist.playlistsId!, song)
                      }
                    >
                      <SaveSVG />
                      <span>{playlist.playlistsName}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </li>

          <li className="song-model-list-item">
            <button className="song-model-list-item-btn">
              <ShareSVG />
              <span>Share</span>
              <div className="svg-con-margin">
                <ForwardSVG />
              </div>
            </button>
          </li>

          {isOwnerId && playlistId && (
            <li className="song-model-list-item">
              <button
                onClick={onRemoveSongFromPlaylist}
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
