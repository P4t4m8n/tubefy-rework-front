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
  const [searchSongsList, setSearchSongsList] = useState<ISongYT[]>(_songs);

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

const _songs: ISongYT[] = [
  {
    name: "Another Day In Paradise",
    artist: "Phil Collins",
    duration: "04:50",
    youtubeId: "Qt2mbGP6vFI",
    imgUrl: "https://i.ytimg.com/vi/Qt2mbGP6vFI/mqdefault.jpg",
    addedBy: "artist",
    addedAt: "Fri Oct 04 2024 14:43:21 GMT+0300 (Israel Daylight Time)",
    itemType: "YT_SONG",
  },
  {
    name: "In The Air Tonight",
    artist: "Phil Collins",
    duration: "04:54",
    youtubeId: "YkADj0TPrJA",
    imgUrl: "https://i.ytimg.com/vi/YkADj0TPrJA/mqdefault.jpg",
    addedBy: "artist",
    addedAt: "Fri Oct 04 2024 14:43:22 GMT+0300 (Israel Daylight Time)",
    itemType: "YT_SONG",
  },
  {
    name: "In The Air Tonight",
    artist: "Phil Collins",
    duration: "07:42",
    youtubeId: "PEWP9nbqG9Q",
    imgUrl: "https://i.ytimg.com/vi/PEWP9nbqG9Q/mqdefault.jpg",
    addedBy: "artist",
    addedAt: "Fri Oct 04 2024 14:43:21 GMT+0300 (Israel Daylight Time)",
    itemType: "YT_SONG",
  },
  {
    name: "Phil Collins Greatest Hits Full Album  The Best Soft Rock Of Phil Collins ",
    artist: "Phil Collins Best Songs",
    duration: "02:15:17",
    youtubeId: "BfOcbaV7a_M",
    imgUrl: "https://i.ytimg.com/vi/BfOcbaV7a_M/mqdefault.jpg",
    addedBy: "artist",
    addedAt: "Fri Oct 04 2024 14:43:21 GMT+0300 (Israel Daylight Time)",
    itemType: "YT_SONG",
  },
  {
    name: "Against All Odds",
    artist: "Phil Collins",
    duration: "05:00",
    youtubeId: "_vSHhUujcwY",
    imgUrl: "https://i.ytimg.com/vi/_vSHhUujcwY/mqdefault.jpg",
    addedBy: "artist",
    addedAt: "Fri Oct 04 2024 14:43:21 GMT+0300 (Israel Daylight Time)",
    itemType: "YT_SONG",
  },
];
