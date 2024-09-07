import { RefObject } from "react";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListItem from "./PlaylistSongsListItem";
import { utilService } from "../../util/util.util";

interface Props {
  songs: ISong[];
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  onRemoveSongFromPlaylist?: (songId: string) => void;
  isActive?: boolean;
  isLoggedIn?: boolean;
}

export default function PlaylistSongsList({
  songs,
  isOwner,
  container,
  isActive,
  isLoggedIn,
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
        <p>
          <ClockSVG></ClockSVG>
        </p>
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
            onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
          />
        ))}
      </ul>
    </section>
  );
}
