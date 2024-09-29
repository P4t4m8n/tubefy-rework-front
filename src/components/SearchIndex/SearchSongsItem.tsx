import { RefObject } from "react";
import { IPlaylistModelData } from "../../models/playlist.model";
import { ISong, ISongYT } from "../../models/song.model";
import  LikeBtn  from "../Buttons/LikeBtn";
import PlayBtn from "../Buttons/PlayBtn";
import SongMenu from "../Menus/SongMenu/SongMenu";

interface Props {
  song: ISongYT;
  userPlaylistsForModel?: IPlaylistModelData[];
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  addSongToPlaylistEdit?: (song: ISong) => void;
  playlistId?: string;
}
export default function SearchSongsItem({
  song,
  container,
  playlistId,
  addSongToPlaylistEdit,
}: Props) {
  return (
    <li className="search-index-songs-list-item">
      <PlayBtn item={song} />
      <img src={song.imgUrl} />
      <div className="song-info">
        <p>{song.name}</p>
        <p>{song.artist}</p>
      </div>
      <div className="playlist-songs-list-preview-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        <SongMenu
          song={song}
          container={container}
          isOwner={false}
          modelSize={{ width: 208, height: 240 }}
          playlistId={playlistId}
          addSongToPlaylistEdit={addSongToPlaylistEdit}
        />
      </div>
    </li>
  );
}
