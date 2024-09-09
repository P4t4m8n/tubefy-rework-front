import { useLocation } from "react-router-dom";
import { useRef } from "react";

import { IPlaylistDetailed } from "../../../models/playlist.model";
import { getCurrentPlaylist } from "../../../store/getStore";

import UserLibraryListItem from "./UserLibraryListItem";
import UserLibraryLikedSongs from "./UserLibraryLikedSongs";

interface Props {
  playlists: IPlaylistDetailed[];
}
export default function UserLibraryList({ playlists }: Props) {
  const currentPlaylistId = getCurrentPlaylist()?.id;
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const playlistId = segments.pop() || null;
  const container = useRef<HTMLUListElement>(null);

  return (
    <ul ref={container} className="user-playlist-list">
      <UserLibraryLikedSongs
        currentPlaylistId={currentPlaylistId}
        focusedPlaylistId={playlistId}
      />
      {playlists.map((playlist) => (
        <UserLibraryListItem
          playlist={playlist}
          key={playlist.id}
          isHighlighted={
            currentPlaylistId === playlist?.id || playlistId === playlist?.id
          }
          container={container}
        />
      ))}
    </ul>
  );
}
