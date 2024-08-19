import { useNavigate } from "react-router-dom";
import {
  ILikedSongPlaylist,
  IPlaylist,
  IPlaylistDetailed,
} from "../../models/playlist.model";
import PlayBtn from "../Buttons/PlayBtn";
import { DeleteSVG, DotsSVG, NoteSVG, PencilSVG, ShareSVG } from "../svg/SVGs";
import GenericModel from "../GenericComponents/GenericModel";
import { IGenericModelItem } from "../../models/app.model";
import { deletePlaylist } from "../../store/actions/playlist.action";
import { MouseEvent } from "react";

interface Props {
  playlist: IPlaylist | IPlaylistDetailed | ILikedSongPlaylist;
  isHighlighted: boolean;
}

export default function UserLibraryListPreview({
  playlist,
  isHighlighted,
}: Props) {
  const items: IGenericModelItem[] = [
    {
      svg: <DeleteSVG />,
      text: "Delete",
      onClick: () => {
        deletePlaylist(playlist.id!);
      },
    },
    {
      svg: <ShareSVG />,
      text: "Share to playlist",
      onClick: () => console.log("Share  playlist"),
    },
    {
      svg: <PencilSVG />,
      text: "Edit details",
      link: `/playlist/edit/${playlist.id}`,
    },
  ];

  const navigate = useNavigate();

  const onNavigate = (ev: MouseEvent) => {
    ev.stopPropagation();
    navigate(`/playlist/${playlist!.id}`);
  };

  return (
    <li
      onClick={onNavigate}
      className={`user-playlist-item ${isHighlighted ? "highlight" : ""}`}
    >
      <PlayBtn item={playlist} />
      <div className="img-con">
        {playlist.imgUrl ? (
          <img src={playlist.imgUrl} alt={playlist.name} />
        ) : (
          <NoteSVG />
        )}
      </div>
      <span>{playlist.name}</span>
      <p>{playlist.songs.length} songs</p>
      <GenericModel items={items} btnSvg={<DotsSVG />} />
    </li>
  );
}
