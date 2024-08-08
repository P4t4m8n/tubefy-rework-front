import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/api.service";
import { ISongYT } from "../models/song.model";
import { IPlaylist } from "../models/playlist.model";
import { playlistService } from "../services/playlist.service";
import SearchIndexGenresList from "../components/SearchIndex/SearchIndexGenresList";
import SearchIndexSongsList from "../components/SearchIndex/SearchIndexSongsList";
import SearchIndexPlaylistList from "../components/SearchIndex/SearchIndexPlaylistList";
import { Loader } from "../components/Loader";

export default function SearchIndex() {
  const [searchList, setSearch] = useState<{
    songs: ISongYT[];
    playlists: IPlaylist[];
  }>({
    songs: [
      {
        name: "Holy Wars   The Punishment Due",
        artist: "Megadeth",
        duration: "06:38",
        youtubeId: "9d4ui9q7eDM",
        thumbnail: "https://i.ytimg.com/vi/9d4ui9q7eDM/mqdefault.jpg",
        addedBy: "artist",
        createAt: new Date(),
      },
      {
        name: "Symphony Of Destruction",
        artist: "Unknown",
        duration: "04:07",
        youtubeId: "WdoXZf-FZyA",
        thumbnail: "https://i.ytimg.com/vi/WdoXZf-FZyA/mqdefault.jpg",
        addedBy: "artist",
        createAt: new Date(),
      },
      {
        name: "Tornado Of Souls",
        artist: "Unknown",
        duration: "05:23",
        youtubeId: "L8HhOMNrulE",
        thumbnail: "https://i.ytimg.com/vi/L8HhOMNrulE/mqdefault.jpg",
        addedBy: "artist",
        createAt: new Date(),
      },
      {
        name: "Sweating Bullets",
        artist: "Megadeth",
        duration: "04:21",
        youtubeId: "aOnKCcjP8Qs",
        thumbnail: "https://i.ytimg.com/vi/aOnKCcjP8Qs/mqdefault.jpg",
        addedBy: "artist",
        createAt: new Date(),
      },
      {
        name: "A Tout Le Monde",
        artist: "Megadeth",
        duration: "04:14",
        youtubeId: "aU-dKoFZT0A",
        thumbnail: "https://i.ytimg.com/vi/aU-dKoFZT0A/mqdefault.jpg",
        addedBy: "artist",
        createAt: new Date(),
      },
    ],
    playlists: [],
  });
  const { query } = useParams<{ query: string }>();

  useEffect(() => {
    if (query) {
      loadSearchResults(query);
    }
  }, [query]);

  const loadSearchResults = async (query: string) => {
    try {
      const [playlists] = await Promise.all([
        await playlistService.query({ artist: query, limit: 5 }),
      ]);
      setSearch((prev) => ({ ...prev, playlists }));
    } catch (error) {
      console.error(`Error while loading search results: ${error}`);
    }
  };

  return (
    <section className="search-index">
      {!query && <SearchIndexGenresList />}
      {query && searchList.songs.length === 0 && <Loader />}
      {query && searchList.songs.length && (
        <>
          <div className="search-index-songs">
            <div className="top-result">
              <h2>Top result</h2>
              <div className="top-result-info">
                <img src={searchList.songs[0]?.thumbnail} alt="thumbnail"></img>
                <h1>{searchList.songs[0].artist}</h1>
                <p>{searchList.songs[0].name}</p>
              </div>
            </div>
            <div className="search-index-songs-list">
              <h2>Songs</h2>
              <ul>
                {searchList.songs.slice(1).map((song) => (
                  <SearchIndexSongsList song={song} />
                ))}
              </ul>
            </div>
          </div>
          <div className="search-index-playlist">
            <h2>Featuring {query} </h2>
            <ul>
              {searchList.playlists.map((playlist) => (
                <SearchIndexPlaylistList playlist={playlist} />
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
