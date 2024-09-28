import { RefObject } from "react";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListItem from "./PlaylistSongsListItem";
import { TModelSize } from "../../models/app.model";

interface Props {
  songs: ISong[];
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  onRemoveSongFromPlaylist?: (songId: string) => void;
  isActive?: boolean;
  isLoggedIn?: boolean;
}

export default function PlaylistSongsList({
  songs,
  isOwner,
  container,
  modelSize,
  isLoggedIn,
  isActive,
  onRemoveSongFromPlaylist,
}: Props) {
  return (
    <section className="playlist-songs-list">
      <div className={`song-list-header ${isActive ? "stick" : ""}`}>
        <p>#</p>
        <p>Title</p>
        <p>Artist</p>
        <p>Date added</p>
        <ClockSVG></ClockSVG>
      </div>
      <ul className="song-list ">
        {songs.map((song, idx) => (
          <PlaylistSongsListItem
            key={idx}
            song={song}
            isLoggedIn={isLoggedIn}
            idx={idx}
            isOwner={isOwner}
            container={container}
            modelSize={modelSize}
            onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
          />
        ))}
      </ul>
    </section>
  );
}
