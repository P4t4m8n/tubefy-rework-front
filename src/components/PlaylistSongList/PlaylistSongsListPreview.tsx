import PlayBtn from "../Buttons/PlayBtn";
import { ISong } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import { utilService } from "../../util/util.util";
import SongModel from "../SongModel/SongModel";
import { IPlaylistModelData } from "../../models/playlist.model";

interface Props {
  onRemoveSongFromPlaylist: (songId: string) => void;
  isOwner: boolean;
  song: ISong;
  idx: number;
  playlistModelData: IPlaylistModelData[];
}

export default function PlaylistSongsListPreview({
  song,
  idx,
  isOwner,
  playlistModelData,
  onRemoveSongFromPlaylist,
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
          playlistModelData={playlistModelData}
          isOwner={isOwner}
          onRemoveSongFromPlaylist={onRemoveSongFromPlaylist}
        />
      </div>
    </li>
  );
}
