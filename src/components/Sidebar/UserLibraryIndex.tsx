import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../hooks/useStore";
import CreatePlaylist from "./CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter";
import Login from "../User/Login";
import { Loader } from "../Loader";
import { loadUserPlaylists } from "../../store/actions/playlist.action";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { IPlaylistDetailed } from "../../models/playlist.model";
import PlayBtn from "../Buttons/PlayBtn";
import { NoteSVG } from "../svg/SVGs";
import { Link } from "react-router-dom";

export function UserLibraryIndex() {
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

  useEffectUpdate(() => {
    if (user) {
      getUserPlaylists();
    }
  }, [user]);

  const getUserPlaylists = async () => {
    try {
      await loadUserPlaylists();
    } catch (error) {
      console.error(`Error while loading user playlists: ${error}`);
      return [];
    }
  };

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
      <CreatePlaylist />
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
            <li className="user-playlist-item">
              <Link to={`/playlist/${userLikedSongsPlaylist!.id}?isLiked=true`}>
                <PlayBtn item={userLikedSongsPlaylist!} />
                {userLikedSongsPlaylist!.imgUrl ? (
                  <img src={userLikedSongsPlaylist!.imgUrl} alt="Liked songs" />
                ) : (
                  <NoteSVG />
                )}
                <img src={userLikedSongsPlaylist!.imgUrl} alt="Liked songs" />
                <span>Liked songs</span>
                <p>{userLikedSongsPlaylist!.songs.length} songs</p>
              </Link>
            </li>
            {playlists.map((playlist) => (
              <li key={playlist.id} className="user-playlist-item">
                <Link to={`/playlist/${playlist.id}`}>
                  <PlayBtn item={playlist} />
                  {playlist.imgUrl ? (
                    <img src={playlist.imgUrl} alt={playlist.name} />
                  ) : (
                    <NoteSVG />
                  )}
                  <span>{playlist.name}</span>
                  <p>{playlist.songs.length} songs</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
