import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../hooks/useStore";
import { IPlaylistDetailed } from "../../models/playlist.model";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter/UserLibraryFilter";
import Login from "../User/Login";
import Loader from "../Loader";
import UserLibraryList from "./UserLibraryList/UserLibraryList";
import { getSocketState } from "../../store/getStore";
import { showUserMsg } from "../../services/eventEmitter";

interface Props {
  setIsFullSize: Dispatch<SetStateAction<boolean>>;
}

export function UserLibraryIndex({ setIsFullSize }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  const likedPlaylist = useAppSelector(
    (state) => state.playlists.likedPlaylist
  );
  const [filteredPlaylists, setFilteredPlaylists] = useState<
    IPlaylistDetailed[]
  >([]);
  const currentSortBy = useRef<"recently_added" | "alphabetical" | "">("");

  const onFilterChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const _filteredPlaylists = userPlaylists.filter(
      (playlist) =>
        playlist.name.includes(ev.target.value) ||
        playlist.songs.some((song) => song.name.includes(ev.target.value))
    );

    setFilteredPlaylists(_filteredPlaylists);
  };

  const sortPlaylists = (sortBy: "recently_added" | "alphabetical") => {
    const _filteredPlaylists = [...userPlaylists];
    if (sortBy === "recently_added") {
      _filteredPlaylists.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } else {
      _filteredPlaylists.sort((a, b) => a.name.localeCompare(b.name));
    }
    currentSortBy.current = sortBy;
    setFilteredPlaylists(_filteredPlaylists);
  };

  const onSharePlaylist = useCallback(
    (playlistId: string, friendId: string) => {
      try {
        const socketService = getSocketState();
        if (!socketService) {
          throw new Error("Socket service not available");
        }
        socketService.emit<{ playlistId: string; friendId: string }>(
          "sharePlaylist",
          { playlistId, friendId }
        );
        showUserMsg({
          text: "Playlist shared successfully",
          imgUrl: "/success-img.png",
          type: "success",
          status: "success",
        });
      } catch (error) {
        showUserMsg({
          text: "Failed to share playlist",
          imgUrl: "/error-img.jpg",
          type: "error",
          status: "error",
        });
      }
    },
    []
  );

  if (user && (!userPlaylists || !likedPlaylist)) return <Loader />;

  const playlists = filteredPlaylists.length
    ? filteredPlaylists
    : userPlaylists;

  return (
    <section className="user-library">
      <CreatePlaylist setIsFullSize={setIsFullSize} />
      {!user && (
        <div className="user-library-no-user">
          <h2>Log in to view your library</h2>
          <Login />
        </div>
      )}
      {user && (
        <>
          <UserLibraryFilter
            onFilterChange={onFilterChange}
            sortPlaylists={sortPlaylists}
            currentSortBy={currentSortBy.current}
          />
          <UserLibraryList
            playlists={playlists}
            likedPlaylist={likedPlaylist}
            onSharePlaylist={onSharePlaylist}
          />
        </>
      )}
    </section>
  );
}
