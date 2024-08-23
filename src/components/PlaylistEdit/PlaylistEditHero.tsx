import { ChangeEvent } from "react";
import PlaylistEditHeroImg from "./PlaylistEditHero/PlaylistEditHeroImg";
import PlaylistEditHeroModel from "./PlaylistEditHero/PlaylistEditHeroModel";
import BackgroundGradient from "../BackgroundGradient";

interface Props {
  imgUrl: string;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  onSaveHero: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
  infoData: {
    name: string;
    description: string;
    username: string;
    avatarUrl: string;
    songs: number;
    duration: string;
    shares: number;
    isPublic: boolean;
  };
}
export default function PlaylistEditHero({
  imgUrl,
  infoData,
  onUploadImg,
  onSaveHero,
}: Props) {
  return (
    <header className="playlist-edit-hero">
      <BackgroundGradient/>
      <PlaylistEditHeroImg imgUrl={imgUrl} onUploadImg={onUploadImg} name="" />
      <PlaylistEditHeroModel
        imgUrl={imgUrl}
        infoData={infoData}
        onSaveHero={onSaveHero}
      />
    </header>
  );
}
