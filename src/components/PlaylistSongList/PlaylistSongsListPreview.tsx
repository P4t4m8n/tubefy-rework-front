import PlayBtn from "../Buttons/PlayBtn";
import { ISong } from "../../models/song.model";
import { LikeBtn } from "../Buttons/LikeBtn";
import GenericModel from "../GenericComponents/GenericModel";
import { DotsSVG } from "../svg/SVGs";
import { IGenericModelItem } from "../../models/app.model";

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
  const { imgUrl, name, id, isLikedByUser } = song;
  return (
    <li className="playlist-songs-list">
      <p className="hover-index">
        <PlayBtn item={song} /> {idx + 1}
      </p>
      <div className="artist-and-image">
        <div className="img-list-con">
          <img src={imgUrl} />
        </div>
        <p>{name}</p>
      </div>
      <p>{song.artist}</p>

      <div className="details-list-control">
        <LikeBtn isLiked={isLikedByUser!} itemId={id} />
        <p>{song.duration}</p>
        <GenericModel btnSvg={<DotsSVG />} items={modelItems} />
      </div>
    </li>
  );
}
