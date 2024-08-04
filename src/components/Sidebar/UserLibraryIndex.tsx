import { ChangeEvent, MouseEvent } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
// import { playlistService } from "../../services/playlist.service";
// import { Loader } from "../Loader";
import CreatePlaylist from "./CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter";
import UserLibraryList from "./UserLibraryList";
import Login from "../User/Login";

export function UserLibraryIndex() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  const createStation = async () => {};

  const onRemoveStation = (ev: ChangeEvent, playlistId: string) => {};

  const handleChange = (ev: ChangeEvent) => {};

  const FilterList = () => {};

  const onSendPlaylist = (
    ev: MouseEvent,
    playlistId: string,
    userId: string
  ) => {};

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
          <UserLibraryFilter />
          <UserLibraryList />
        </>
      )}
    </section>
  );
}
