import { ISongYT } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import PlayBtn from "../Buttons/PlayBtn";
import GenericModel from "../GenericComponents/GenericModel";
import { DotsSVG } from "../svg/SVGs";

interface Props {
  song: ISongYT;
}

export default function SearchIndexSongsList({ song }: Props) {
  return (
    <li className="search-songs-list">
      <PlayBtn item={song} />
      <img src={song.imgUrl} />
      <div>
        <p>{song.name}</p>
        <p>{song.artist}</p>
      </div>
      <div className="playlist-songs-list-preview-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        <GenericModel btnSvg={<DotsSVG />} items={[]} />
      </div>
    </li>
  );
}
