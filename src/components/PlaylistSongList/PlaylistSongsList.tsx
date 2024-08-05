import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListPreview from "./PlaylistSongsListPreview";

interface Props {
  songs: ISong[];
}
export default function PlaylistSongsList({ songs }: Props) {
  return (
    <section className="playlist-songs-list">
      <ul className="song-list grid clean-list">
        <li className="list-header">
          <p> #</p>
          <p>Title</p>
          <p>Artist</p>
          <p>
            <ClockSVG></ClockSVG>
          </p>
        </li>
      </ul>
      <ul className="song-list grid clean-list">
        {songs.map((song, idx) => (
          <PlaylistSongsListPreview
            key={song.id}
            song={song}
            idx={idx}
            modelItems={[]}
          />
        ))}
      </ul>
    </section>
  );
}
