import { ChangeEvent, MouseEvent } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
// import { playlistService } from "../../services/playlist.service";
import { Loader } from "../Loader";
import NoUserBtn from "../User/NoUserBtn";
import CreatePlaylist from "./CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter";
import UserLibraryList from "./UserLibraryList";

export function UserLibraryIndex() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  console.log("navigate:", navigate);

  const createStation = async () => {};

  const onRemoveStation = (ev: ChangeEvent, playlistId: string) => {
    console.log("playlistId:", playlistId);
    console.log("ev:", ev);
  };

  const handleChange = (ev: ChangeEvent) => {
    console.log("ev:", ev);
  };

  const FilterList = () => {};

  const onSendPlaylist = (
    ev: MouseEvent,
    playlistId: string,
    userId: string
  ) => {
    console.log("userId:", userId);
    console.log("playlistId:", playlistId);
    console.log("ev:", ev);
  };

  console.log(
    createStation,
    onRemoveStation,
    handleChange,
    FilterList,
    onSendPlaylist
  );

  if (!user) return <NoUserBtn />;

  const userLibrary = null;
  if (!userLibrary) return <Loader />;

  return (
    <section className="side-bar-content">
      <CreatePlaylist />
      <UserLibraryFilter />
      <UserLibraryList />
    </section>
  );
}
