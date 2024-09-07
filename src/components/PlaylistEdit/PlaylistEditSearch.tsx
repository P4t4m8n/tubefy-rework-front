import { ChangeEvent, RefObject, useState } from "react";
import { SearchSvg } from "../svg/SVGs";
import { ISong, ISongYT } from "../../models/song.model";
import { apiService } from "../../services/api.service";
import { utilService } from "../../util/util.util";
import SearchSongsItem from "../SearchIndex/SearchSongsItem";

interface Props {
  addSongToPlaylistEdit: (song: ISong) => void;
  playlistId?: string;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
}
export default function PlaylistEditSearch({
  playlistId,
  container,
  addSongToPlaylistEdit,
}: Props) {
  const [searchSongsList, setSearchSongsList] = useState<ISongYT[]>([]);

  const searchSongs = async (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    try {
      const songs = await apiService.getSongsFromYT(value);
      if (songs) {
        setSearchSongsList(songs);
      }
    } catch (error) {
      utilService.handleError(
        "Failed to search songs",
        "GENERAL_ERROR",
        error as Error
      );
    }
  };
  const debouncedSearch = utilService.debounce(searchSongs, 2000);
  return (
    <div className="search-edit-songs">
      <h2 className="add_song_title">Add songs</h2>
      <form className="search-box">
        <SearchSvg />
        <input
          onChange={debouncedSearch}
          type="text"
          name="searchTerm"
          placeholder="What do you want to listen to?"
        />
      </form>
      <ul className="search-song-list">
        {searchSongsList.map((song) => (
          <SearchSongsItem
            key={song.youtubeId}
            song={song}
            addSongToPlaylistEdit={addSongToPlaylistEdit}
            container={container}
            playlistId={playlistId}
          />
        ))}
      </ul>
    </div>
  );
}
