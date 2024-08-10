// import { ChangeEvent, MouseEvent, useEffect } from "react";
import {  useEffect } from "react";
import { useAppSelector } from "../../hooks/useStore";
import CreatePlaylist from "./CreatePlaylist";
// import { useNavigate } from "react-router-dom";
// import UserLibraryFilter from "./UserLibraryFilter";
// import UserLibraryList from "./UserLibraryList";
import Login from "../User/Login";
import { Loader } from "../Loader";
import { loadUserPlaylists } from "../../store/actions/playlist.action";

export function UserLibraryIndex() {
  const user = useAppSelector((state) => state.user.user);
  const userPlaylists = useAppSelector(
    (state) => state.playlists.userPlaylists
  );
  console.log("userPlaylists:", userPlaylists)

  useEffect(() => {
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

  // const navigate = useNavigate();

  // const createStation = async () => {};

  // const onRemoveStation = (ev: ChangeEvent, playlistId: string) => {};

  // const handleChange = (ev: ChangeEvent) => {};

  // const FilterList = () => {};

  // const onSendPlaylist = (
  //   ev: MouseEvent,
  //   playlistId: string,
  //   userId: string
  // ) => {};

  if (!userPlaylists) return <Loader />;

  return (
    <section className="user-library">
      <CreatePlaylist />
      {!user && (
        <div className="user-library-no-user">
          <h2>Log in to view your library</h2>

          <Login />
        </div>
      )}
      {/* {user && (
        <>
          <UserLibraryFilter />
          <UserLibraryList />
        </>
      )} */}
    </section>
  );
}
