import { IGenericModelItem } from "../../models/app.model";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListPreview from "./PlaylistSongsListPreview";

interface Props {
  songs: ISong[];
  modelItems?: IGenericModelItem[];
}
export default function PlaylistSongsList({ songs, modelItems = [] }: Props) {
  return (
    <section className="playlist-songs-list">
      <ul className="song-list ">
        <li className="list-header">
          <p> #</p>
          <p>Title</p>
          <p>Artist</p>
          <p>Date added</p>
          <p>
            <ClockSVG></ClockSVG>
          </p>
        </li>
      </ul>
      <ul className="song-list ">
        {songs.map((song, idx) => (
          <PlaylistSongsListPreview
            key={song.id}
            song={song}
            idx={idx}
            modelItems={modelItems}
          />
        ))}
      </ul>
    </section>
  );
}
