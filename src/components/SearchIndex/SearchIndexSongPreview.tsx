import { IPlaylistModelData } from "../../models/playlist.model";
import { ISongYT } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import PlayBtn from "../Buttons/PlayBtn";
import SearchIndexSongPreviewModel from "./SearchIndexSongPreviewModel";

interface Props {
  song: ISongYT;
  onSaveYTSong: (song: ISongYT, playlistId: string) => void;
  userPlaylistsForModel: IPlaylistModelData[];
}
export default function SearchIndexSongPreview({
  song,
  userPlaylistsForModel,
  onSaveYTSong,
}: Props) {
  return (
    <li className="search-index-songs-list-item">
      <PlayBtn item={song} />
      <img src={song.imgUrl} />
      <div>
        <p>{song.name}</p>
        <p>{song.artist}</p>
      </div>
      <div className="playlist-songs-list-preview-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        <SearchIndexSongPreviewModel
          song={song}
          onSaveYTSong={onSaveYTSong}
          userPlaylistsForModel={userPlaylistsForModel}
        />
      </div>
    </li>
  );
}
