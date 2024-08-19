import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISongYT } from "../models/song.model";
import { IPlaylist } from "../models/playlist.model";
import { playlistService } from "../services/playlist.service";
import SearchIndexGenresList from "../components/SearchIndex/SearchIndexGenresList";
import SearchIndexSongsList from "../components/SearchIndex/SearchIndexSongsList";
import SearchIndexPlaylistList from "../components/SearchIndex/SearchIndexPlaylistList";
import { Loader } from "../components/Loader";
import { apiService } from "../services/api.service";

export default function SearchIndex() {
  const [searchList, setSearch] = useState<{
    songs: ISongYT[];
    playlists: IPlaylist[];
  }>({
    songs: [],
    playlists: [],
  });
  console.log("searchList:", searchList);
  const { query } = useParams<{ query: string }>();

  useEffect(() => {
    if (query) {
      loadSearchResults(query);
    }
  }, [query]);

  const loadSearchResults = async (query: string) => {
    try {
      const [songs, playlists] = await Promise.all([
        await apiService.getSongsFromYT(query),
        await playlistService.query({ artist: query, limit: 5 }),
      ]);
      setSearch((prev) => ({ ...prev, playlists, songs }));
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
                <img src={searchList.songs[0]?.imgUrl} alt="imgUrl"></img>
                <h1>{searchList.songs[0].artist}</h1>
                <p>{searchList.songs[0].name}</p>
              </div>
            </div>
            <div className="search-index-songs-list">
              <h2>Songs</h2>
              <ul>
                {searchList.songs.slice(1).map((song) => (
                  <SearchIndexSongsList key={song.youtubeId} song={song} />
                ))}
              </ul>
            </div>
          </div>
          <div className="search-index-playlist">
            <h2>Featuring {query} </h2>
            <ul>
              {searchList.playlists.map((playlist) => (
                <SearchIndexPlaylistList
                  key={playlist.id}
                  playlist={playlist}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
