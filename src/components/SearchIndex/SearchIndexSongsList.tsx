import { IPlaylistModelData } from "../../models/playlist.model";
import { ISongYT } from "../../models/song.model";

import SearchSongsItem from "./SearchSongsItem";

interface Props {
  songs?: ISongYT[];
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  userPlaylistsForModel: IPlaylistModelData[];
}

export default function SearchIndexSongsList({
  songs,
  userPlaylistsForModel,
  onSaveYTSong,
}: Props) {
  if (!songs || !songs.length) {
    return (
      <div className="search-index-songs no-songs">
        <h2>No songs found</h2>
      </div>
    );
  }

  const slicedSongs = songs.slice(1);
  return (
    <div className="search-index-songs">
      <h2>Songs</h2>
      {/* <div className="top-result">
        <SearchSongsItem
          onSaveYTSong={onSaveYTSong}
          userPlaylistsForModel={userPlaylistsForModel}
          song={songs[0]}
        />
      </div> */}

      <ul className="search-index-songs-list">
        {songs.map((song) => (
          <SearchSongsItem
            onSaveYTSong={onSaveYTSong}
            userPlaylistsForModel={userPlaylistsForModel}
            song={song}
            key={song.youtubeId}
          />
        ))}
      </ul>
    </div>
  );
}
