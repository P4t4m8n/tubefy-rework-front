import { ChangeEvent, Dispatch, useState } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { loadUserPlaylists } from "../../store/actions/playlist.action";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { IPlaylistDetailed } from "../../models/playlist.model";
import { Link, useLocation } from "react-router-dom";
import { NoteSVG } from "../svg/SVGs";
import { store } from "../../store/store";
import CreatePlaylist from "./CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter";
import Login from "../User/Login";
import UserLibraryListPreview from "./UserLibraryListPreview";
import PlayBtn from "../Buttons/PlayBtn";
import Loader from "../Loader";

interface Props {
  setIsFullSize: Dispatch<React.SetStateAction<boolean>>;
}

export function UserLibraryIndex({ setIsFullSize }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  const userLikedSongsPlaylist = useAppSelector(
    (state) => state.playlists.likedPlaylist
  );

  const [filteredPlaylists, setFilteredPlaylists] = useState<
    IPlaylistDetailed[]
  >([]);

  const currentPlaylistId = store.getState().player.currentPlaylist?.id || null;
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const playlistId = segments.pop() || null;

  useEffectUpdate(() => {
    if (user) {
      loadUserPlaylists();
    }
  }, [user]);

  const onFilterChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const _filteredPlaylists = userPlaylists.filter((playlist) =>
      playlist.name.includes(ev.target.value)
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

    setFilteredPlaylists(_filteredPlaylists);
  };

  if (user && (!userPlaylists || !userLikedSongsPlaylist)) return <Loader />;

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
          />
          <ul className="user-playlist-list">
            <Link to={`/playlist/${userLikedSongsPlaylist!.id}?isLiked=true`}>
              <li
                className={`user-playlist-item ${
                  currentPlaylistId === userLikedSongsPlaylist?.id ||
                  playlistId === userLikedSongsPlaylist?.id
                    ? "highlight"
                    : ""
                }`}
              >
                <PlayBtn item={userLikedSongsPlaylist!} />
                <div className="img-con">
                  {userLikedSongsPlaylist?.imgUrl ? (
                    <img
                      src={userLikedSongsPlaylist!.imgUrl}
                      alt="Liked songs"
                    />
                  ) : (
                    <NoteSVG />
                  )}
                </div>
                <span>Liked songs</span>
                <p>{userLikedSongsPlaylist!.songs.length} songs</p>
              </li>
            </Link>
            {playlists.map((playlist) => (
              <UserLibraryListPreview
                playlist={playlist}
                key={playlist.id}
                isHighlighted={
                  currentPlaylistId === playlist?.id ||
                  playlistId === playlist?.id
                }
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
