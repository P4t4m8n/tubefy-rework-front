import { ChangeEvent, useState } from "react";
import { SearchSvg } from "../svg/SVGs";
import { ISongYT } from "../../models/song.model";
import { apiService } from "../../services/api.service";
import { utilService } from "../../util/util.util";
import SearchIndexSongPreview from "../SearchIndex/SearchIndexSongPreview";
import { showUserMsg } from "../../services/eventEmitter";

interface Props {
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  playlistId?: string;
}
export default function PlaylistEditSearch({
  onSaveYTSong,
  playlistId,
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
      showUserMsg({
        text: error as string,
        type: "general-error",
        status: "error",
      });
    }
  };
  const debouncedSearch = utilService.debounce(searchSongs, 2000);
  return (
    <div className="search-edit-songs">
      <form className="search-box">
        <SearchSvg />
        <input
          onChange={debouncedSearch}
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="What do you want to listen to?"
        />
      </form>
      <ul>
        {searchSongsList.map((song) => (
          <SearchIndexSongPreview
            key={song.youtubeId}
            song={song}
            onSaveYTSong={onSaveYTSong}
            playlistId={playlistId}
          />
        ))}
      </ul>
    </div>
  );
}
