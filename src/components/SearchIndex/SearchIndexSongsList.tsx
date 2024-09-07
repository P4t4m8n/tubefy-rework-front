import { IPlaylistModelData } from "../../models/playlist.model";
import { ISongYT } from "../../models/song.model";
import PlayBtn from "../Buttons/PlayBtn";
import SearchSongsItem from "./SearchSongsItem";

interface Props {
  songs: ISongYT[];
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  userPlaylistsForModel: IPlaylistModelData[];
}

export default function SearchIndexSongsList({
  songs,
  userPlaylistsForModel,
  onSaveYTSong,
}: Props) {
  const { imgUrl, artist, name } = songs[0];

  const slicedSongs = songs.slice(1);
  return (
    <div className="search-index-songs">
      <div className="top-result">
        <h2>Top result</h2>
        <div className="top-result-info">
          <div className="img-con">
            <img src={imgUrl} alt="imgUrl"></img>
            <PlayBtn item={songs[0]} />
          </div>
          <h1>{artist}</h1>
          <p>{name}</p>
        </div>
      </div>
      <div className="search-index-songs-list-con">
        <h2>Songs</h2>
        <ul className="search-index-songs-list">
          {slicedSongs.map((song) => (
            <SearchSongsItem
              onSaveYTSong={onSaveYTSong}
              userPlaylistsForModel={userPlaylistsForModel}
              song={song}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
