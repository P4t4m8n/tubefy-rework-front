import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ISongYT } from "../models/song.model";
import { IPlaylist } from "../models/playlist.model";
import { playlistService } from "../services/playlist.service";
import { apiService } from "../services/api.service";
import { transformUserPlaylistsForModel } from "../util/playlist.util";
import { songService } from "../services/song.service";
import { addSongToPlaylist } from "../store/actions/playlist.action";
import { useAppSelector } from "../hooks/useStore";
import SearchIndexGenresList from "../components/SearchIndex/SearchIndexGenresList";
import SearchIndexSongsList from "../components/SearchIndex/SearchIndexSongsList";
import SearchIndexPlaylistList from "../components/SearchIndex/SearchIndexPlaylistList";
import Loader from "../components/Loader";
import { utilService } from "../util/util.util";

export default function SearchIndex() {
  const user = useAppSelector((state) => state.user.user);
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  const [searchList, setSearch] = useState<{
    songs: ISongYT[];
    playlists: IPlaylist[];
  }>({
    songs: [],
    playlists: [],
  });
  const { query } = useParams<{ query: string }>();

  useEffect(() => {
    const loadSearchResults = async (query: string) => {
      try {
        const [songs, playlists] = await Promise.all([
          await apiService.getSongsFromYT(query),
          await playlistService.query({ artist: query, limit: 5 }),
        ]);
        setSearch((prev) => ({ ...prev, playlists, songs }));
      } catch (error) {
        utilService.handleError(
          "Failed to load search results",
          "GENERAL_ERROR",
          error as Error
        );
      }
    };

    if (query) {
      loadSearchResults(query);
    }
  }, [query]);

  const userPlaylistsForModel = useMemo(
    () => transformUserPlaylistsForModel(userPlaylists),
    [userPlaylists]
  );

  const onSaveYTSong = useCallback(
    async (songYT: ISongYT, playlistId: string) => {
      try {
        if (!user) {
          throw new Error("User not found");
        }
        const song = await songService.createSong(songYT);
        await addSongToPlaylist(playlistId, song);
      } catch (error) {
        utilService.handleError(
          "Failed to save song",
          "GENERAL_ERROR",
          error as Error
        );
      }
    },
    [user]
  );

  return (
    <section className="search-index">
      {!query && <SearchIndexGenresList />}
      {query && searchList.songs.length === 0 && <Loader />}
      {query && searchList.songs.length && (
        <>
          <SearchIndexSongsList
            onSaveYTSong={onSaveYTSong}
            userPlaylistsForModel={userPlaylistsForModel}
            songs={searchList.songs}
          />
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
