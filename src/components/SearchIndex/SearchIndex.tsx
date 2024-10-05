import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ISongYT } from "../../models/song.model";
import { IPlaylist, PLAYLISTS_TYPES } from "../../models/playlist.model";

import { playlistService } from "../../services/playlist.service";
import { apiService } from "../../services/api.service";
import {
  getPlaylistFilterForSearch,
  transformUserPlaylistsForModel,
} from "../../util/playlist.util";
import { songService } from "../../services/song.service";
import { addSongToPlaylist } from "../../store/actions/playlist.action";
import { useAppSelector } from "../../hooks/useStore";
import { utilService } from "../../util/util.util";

import SearchIndexGenresList from "./SearchIndexLinksList";
import SearchIndexSongsList from "./SearchIndexSongsList";
import Loader from "../Loader";
import { GENRES } from "../../models/app.model";
import SearchDefault from "./SearchDefault";
import PlaylistIndexList from "../PlaylistIndex/PlaylistIndexList";

export default function SearchIndex() {
  const user = useAppSelector((state) => state.user.user);
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  const [searchList, setSearch] = useState<{
    songs: ISongYT[];
    playlists: IPlaylist[];
  }>({
    songs: [
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
    ],
    playlists: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const { artist, genre, type } = useParams<{
    artist?: string;
    genre?: string;
    type?: string;
  }>();

  const query = artist || genre || type || "";
  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        // const songs = apiService.getSongsFromYT(query);
        const playlistFilter = getPlaylistFilterForSearch(artist, genre, type);
        const playlists = playlistService.query(playlistFilter);

        const searchResults = await Promise.all([playlists]);
        setSearch((prev) => ({ ...prev, playlists: searchResults[0] }));
      } catch (error) {
        utilService.handleError(
          "Failed to load search results",
          "GENERAL_ERROR",
          error as Error
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      setIsLoading(true);
      loadSearchResults();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const song = await songService.createSong(playlistId, songYT);
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

  if (isLoading) return <Loader />;

  return (
    <section className="search-index">
      <SearchIndexGenresList links={GENRES} type="Genres" />
      <SearchIndexGenresList links={PLAYLISTS_TYPES} type="Types" />
      {!query && <SearchDefault />}
      {query && (
        <section className="items-con">
          <SearchIndexSongsList
            onSaveYTSong={onSaveYTSong}
            userPlaylistsForModel={userPlaylistsForModel}
            songs={searchList.songs}
          />
          <div className="search-index-playlist">
            <h2>Featuring {query} </h2>
            <PlaylistIndexList playlists={searchList.playlists} />
          </div>
        </section>
      )}
    </section>
  );
}
