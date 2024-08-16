import { ChangeEvent, useState } from "react";
import { SearchSvg } from "../svg/SVGs";
import { ISongYT } from "../../models/song.model";
import { apiService } from "../../services/api.service";
import { utilService } from "../../util/util.util";
import SearchIndexSongsList from "../SearchIndex/SearchIndexSongsList";

export default function PlaylistEditSearch() {
  const [searchSongsList, setSearchSongsList] = useState<ISongYT[]>([
    {
      name: "Holy Wars   The Punishment Due",
      artist: "Megadeth",
      duration: "06:38",
      youtubeId: "9d4ui9q7eDM",
      imgUrl: "https://i.ytimg.com/vi/9d4ui9q7eDM/mqdefault.jpg",
      addedBy: "artist",
      addedAt: new Date().toString(),
    },
    {
      name: "Symphony Of Destruction",
      artist: "Unknown",
      duration: "04:07",
      youtubeId: "WdoXZf-FZyA",
      imgUrl: "https://i.ytimg.com/vi/WdoXZf-FZyA/mqdefault.jpg",
      addedBy: "artist",
      addedAt: new Date().toString(),
    },
    {
      name: "Tornado Of Souls",
      artist: "Unknown",
      duration: "05:23",
      youtubeId: "L8HhOMNrulE",
      imgUrl: "https://i.ytimg.com/vi/L8HhOMNrulE/mqdefault.jpg",
      addedBy: "artist",
      addedAt: new Date().toString(),
    },
    {
      name: "Sweating Bullets",
      artist: "Megadeth",
      duration: "04:21",
      youtubeId: "aOnKCcjP8Qs",
      imgUrl: "https://i.ytimg.com/vi/aOnKCcjP8Qs/mqdefault.jpg",
      addedBy: "artist",
      addedAt: new Date().toString(),
    },
    {
      name: "A Tout Le Monde",
      artist: "Megadeth",
      duration: "04:14",
      youtubeId: "aU-dKoFZT0A",
      imgUrl: "https://i.ytimg.com/vi/aU-dKoFZT0A/mqdefault.jpg",
      addedBy: "artist",
      addedAt: new Date().toString(),
    },
  ]);

  const searchSongs = async (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    try {
      const songs = await apiService.getSongsFromYT(value);
      if (songs) {
        setSearchSongsList(songs);
      }
    } catch (error) {
      console.error("error:", error);
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
          <SearchIndexSongsList key={song.youtubeId} song={song} />
        ))}
      </ul>
    </div>
  );
}
