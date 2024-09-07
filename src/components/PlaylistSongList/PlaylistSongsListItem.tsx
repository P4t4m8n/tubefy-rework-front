import PlayBtn from "../Buttons/PlayBtn";
import { ISong } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import { utilService } from "../../util/util.util";
import SongMenu from "../Menus/SongMenu/SongMenu";
import { RefObject } from "react";
import Login from "../User/Login";

interface Props {
  song: ISong;
  idx: number;
  isOwner: boolean;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  onRemoveSongFromPlaylist?: (songId: string) => void;
  isLoggedIn?: boolean;
}

export default function PlaylistSongsListPreview({
  song,
  idx,
  isOwner,
  container,
  isLoggedIn,
  onRemoveSongFromPlaylist,
}: Props) {
  const { imgUrl, name } = song;
  const addedAt = utilService.getDaysSince(song.addedAt);
  const randomNumber = utilService.getRandomIntInclusive(1, 1000);

  return (
    <li key={randomNumber + idx} className="playlist-songs-list-item">
      <div className="hover-index">
        <PlayBtn item={song} />
        <p>{idx + 1}</p>
      </div>

      <img src={imgUrl} />
      <p>{name}</p>

      <p className="artist">{song.artist}</p>
      <p>{addedAt} days ago</p>

      <div className="playlist-songs-list-item-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        {isLoggedIn ? (
          <SongMenu
            container={container}
            onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
            song={song}
            isOwner={isOwner}
            modelSize={{ width: 208, height: 240 }}
          />
        ) : (
          <Login />
        )}
      </div>
    </li>
  );
}
