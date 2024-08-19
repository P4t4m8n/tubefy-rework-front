import PlayBtn from "../Buttons/PlayBtn";
import { ISong } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import { IGenericModelItem } from "../../models/app.model";
import { utilService } from "../../util/util.util";
import SongModel from "../SongModel/SongModel";
import { IPlaylistDetailed } from "../../models/playlist.model";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setPlaylist: Dispatch<SetStateAction<IPlaylistDetailed|null>>;
  isOwnerId: string;
  song: ISong;
  idx: number;
  playlistId?: string;
  modelItems?: IGenericModelItem[];
  userPlaylistsData?: {
    playlistsId?: string;
    playlistsName: string;
    playlistImg: string;
  }[];
}

export default function PlaylistSongsListPreview({
  song,
  idx,
  isOwnerId,
  playlistId,
  userPlaylistsData,
  setPlaylist,
}: Props) {
  const { imgUrl, name } = song;
  const addedAt = utilService.getDaysSince(song.addedAt);

  return (
    <li className="playlist-songs-list-preview">
      <div className="hover-index">
        <PlayBtn item={song} />
        <p>{idx + 1}</p>
      </div>
      <div className="artist-and-image">
        <img src={imgUrl} />
        <p>{name}</p>
      </div>
      <p>{song.artist}</p>
      <p>{addedAt} days ago</p>

      <div className="playlist-songs-list-preview-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        <SongModel
          song={song}
          userPlaylistsData={userPlaylistsData}
          isOwnerId={isOwnerId}
          playlistId={playlistId}
          setPlaylist={setPlaylist}
        />
      </div>
    </li>
  );
}
