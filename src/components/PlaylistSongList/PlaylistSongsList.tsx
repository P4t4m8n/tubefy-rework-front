import { IPlaylistModelData } from "../../models/playlist.model";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListPreview from "./PlaylistSongsListPreview";

interface Props {
  songs: ISong[];
  playlistModelData: IPlaylistModelData[];
  isOwner: boolean;
  onRemoveSongFromPlaylist: (songId: string) => void;
}
export default function PlaylistSongsList({
  songs,
  playlistModelData,
  isOwner,
  onRemoveSongFromPlaylist,
}: Props) {
  return (
    <section className="playlist-songs-list">
      <ul className="song-list song-list-header ">
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
            playlistModelData={playlistModelData}
            isOwner={isOwner}
            onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
          />
        ))}
      </ul>
    </section>
  );
}
