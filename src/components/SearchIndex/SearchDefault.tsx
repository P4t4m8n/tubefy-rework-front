import { IPlaylistsGroup } from "../../models/playlist.model";
import { getSessionData } from "../../services/localSession.service";
import { extractHeroPlaylists } from "../../util/playlist.util";

import PlaylistIndexList from "../PlaylistIndex/PlaylistIndexList";

export default function SearchDefault() {
  const data = getSessionData<IPlaylistsGroup[]>("defaultPlaylists");
  if (!data) {
    return null;
  }
  const playlists = extractHeroPlaylists(data);

  return (
    <div className="search-default">
      <h2>
        Random Searched Playlists, search for artist, song name, genre or type
        to get specific search result
      </h2>
      <PlaylistIndexList playlists={playlists} />
    </div>
  );
}
