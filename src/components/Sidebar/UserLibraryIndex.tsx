import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../hooks/useStore";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import UserLibraryFilter from "./UserLibraryFilter/UserLibraryFilter";
import UserLibraryList from "./UserLibraryList/UserLibraryList";
import { usePlaylistFilter } from "../../hooks/usePlaylistFilter";

interface Props {
  setIsFullSize: Dispatch<SetStateAction<boolean>>;
}

export function UserLibraryIndex({ setIsFullSize }: Props) {
  const user = useAppSelector((state) => state.user.user);

  const {
    playlists,
    currentSortBy,
    sortPlaylists,
    onFilterChange,
    userPlaylistLength,
  } = usePlaylistFilter();

  return (
    <section className="user-library">
      <CreatePlaylist
        setIsFullSize={setIsFullSize}
        userPlaylistLength={userPlaylistLength}
      />
      {!user && (
        <div className="user-library-no-user">
          <h2>Log in to view your library</h2>
        </div>
      )}
      {user && (
        <>
          <UserLibraryFilter
            onFilterChange={onFilterChange}
            sortPlaylists={sortPlaylists}
            currentSortBy={currentSortBy}
          />
          <UserLibraryList playlists={playlists} />
        </>
      )}
    </section>
  );
}
