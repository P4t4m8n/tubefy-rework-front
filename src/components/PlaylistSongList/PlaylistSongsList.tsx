import { RefObject } from "react";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListItem from "./PlaylistSongsListItem";
import { utilService } from "../../util/util.util";
import { TModelSize } from "../../models/app.model";

interface Props {
  songs: ISong[];
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  onRemoveSongFromPlaylist?: (songId: string) => void;
  isActive?: boolean;
  isLoggedIn?: boolean;
  modelSize: TModelSize;
}

export default function PlaylistSongsList({
  songs,
  isOwner,
  container,
  isActive,
  isLoggedIn,
  modelSize,
  onRemoveSongFromPlaylist,
}: Props) {
  const randomNumber = utilService.getRandomIntInclusive(1, 1000);
  return (
    <section className="playlist-songs-list">
      <div className={`song-list-header ${isActive && "stick"}`}>
        <p>#</p>
        <p>Title</p>
        <p>Artist</p>
        <p>Date added</p>
       
          <ClockSVG></ClockSVG>
        
      </div>
      <ul className="song-list ">
        {songs.map((song, idx) => (
          <PlaylistSongsListItem
            key={idx + randomNumber}
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
