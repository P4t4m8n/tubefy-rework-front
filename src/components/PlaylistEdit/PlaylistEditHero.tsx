import { ChangeEvent, FormEvent } from "react";
import PlaylistEditHeroImg from "./PlaylistEditHero/PlaylistEditHeroImg";
import PlaylistEditHeroModel from "./PlaylistEditHero/PlaylistEditHeroModel";

interface Props {
  imgUrl: string;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSaveHero: (ev: FormEvent<HTMLFormElement>) => void;
  infoData: {
    name: string;
    description: string;
    username: string;
    avatarUrl: string;
    songs: number;
    duration: string;
    shares: number;
  };
}
export default function PlaylistEditHero({
  imgUrl,
  infoData,
  onUploadImg,
  onSaveHero,
}: Props) {
  return (
    <header className="playlists-edit-hero">
      <PlaylistEditHeroImg imgUrl={imgUrl} onUploadImg={onUploadImg} name="" />
      <PlaylistEditHeroModel
        imgUrl={imgUrl}
        onUploadImg={onUploadImg}
        infoData={infoData}
        onSaveHero={onSaveHero}
      />
    </header>
  );
}
