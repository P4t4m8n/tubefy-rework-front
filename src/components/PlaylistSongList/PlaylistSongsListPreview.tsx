import PlayBtn from "../Buttons/PlayBtn";
import { ISong } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import GenericModel from "../GenericComponents/GenericModel";
import { DotsSVG } from "../svg/SVGs";
import { IGenericModelItem } from "../../models/app.model";
import { utilService } from "../../util/util.util";

interface Props {
  song: ISong;
  idx: number;
  modelItems: IGenericModelItem[];
}

export default function PlaylistSongsListPreview({
  song,
  idx,
  modelItems,
}: Props) {
  const { thumbnail, name } = song;
  const addedAt = utilService.getDaysSince(song.addedAt);
  return (
    <li className="playlist-songs-list-preview">
      <div className="hover-index">
        <PlayBtn item={song} />
        <p>{idx + 1}</p>
      </div>
      <div className="artist-and-image">
        <img src={thumbnail} />
        <p>{name}</p>
      </div>
      <p>{song.artist}</p>
      <p>{addedAt} days ago</p>

      <div className="playlist-songs-list-preview-actions">
        <LikeBtn item={song} />
        <p>{song.duration}</p>
        <GenericModel btnSvg={<DotsSVG />} items={modelItems} />
      </div>
    </li>
  );
}
