import { ChangeEvent } from "react";
import ImageUploadContainer from "./PlaylistEditHero/ImageUploadContainer";
import PlaylistEditHeroModel from "./PlaylistEditHero/PlaylistEditHeroModel";
import { IUserSmall } from "../../models/user.model";
import { IPlaylist } from "../../models/playlist.model";

interface Props {
  owner: IUserSmall;
  playlist: IPlaylist;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onUpdatePlaylist: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
}
export default function PlaylistEditHero({
  owner,
  playlist,
  onUploadImg,
  onUpdatePlaylist,
}: Props) {
  const { imgUrl } = playlist;
  return (
    <header className="playlist-edit-hero">
      <ImageUploadContainer imgUrl={imgUrl} onUploadImg={onUploadImg} name="" />
      <PlaylistEditHeroModel
        owner={owner}
        playlist={playlist}
        onUpdatePlaylist={onUpdatePlaylist}
      />
    </header>
  );
}
