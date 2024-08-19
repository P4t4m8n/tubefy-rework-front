import { IGenericModelItem } from "../../models/app.model";
import { IPlaylistDetailed } from "../../models/playlist.model";
import { ISong } from "../../models/song.model";
import { ClockSVG } from "../svg/SVGs";
import PlaylistSongsListPreview from "./PlaylistSongsListPreview";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setPlaylist: Dispatch<SetStateAction<IPlaylistDetailed|null>>;
  songs: ISong[];
  isOwnerId: string;
  playlistId?: string;
  modelItems?: IGenericModelItem[];
  userPlaylistsData?: {
    playlistsId?: string;
    playlistsName: string;
    playlistImg: string;
  }[];
}
export default function PlaylistSongsList({
  songs,
  modelItems,
  userPlaylistsData,
  isOwnerId,
  playlistId,
  setPlaylist,
}: Props) {
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
            userPlaylistsData={userPlaylistsData}
            isOwnerId={isOwnerId}
            playlistId={playlistId}
            setPlaylist={setPlaylist}
          />
        ))}
      </ul>
    </section>
  );
}
