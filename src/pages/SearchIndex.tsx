import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/api.service";
import { ISongYT } from "../models/song.model";
import { IPlaylistYT } from "../models/playlist.model";

export default function SearchIndex() {
  const [searchList, setSearch] = useState<{
    songs: ISongYT[];
    playlists: IPlaylistYT[];
  }>({ songs: [], playlists: [] });
  const params = useParams<{ query: string }>();

  useEffect(() => {
    if (params.query) {
      loadSearchResults(params.query);
    }
  }, [params.query]);

  const loadSearchResults = async (query: string) => {
    try {
      const [songs, playlists] = await Promise.all([
        await apiService.getSongsFromYT(query),
        await apiService.getPlaylistsFromYT(query),
      ]);
      setSearch({ songs, playlists });
    } catch (error) {
      console.error(`Error while loading search results: ${error}`);
    }
  };
  console.log("searchList:", searchList);
  return <div>SearchIndex</div>;
}
