import { ChangeEvent, FormEvent, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import PlaylistEditHeroImg from "./PlaylistEditHeroImg";
import { PlusSVG } from "../../svg/SVGs";

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
    isPublic: boolean;
  };
}

export default function PlaylistEditHeroModel({
  imgUrl,
  infoData,
  onUploadImg,
  onSaveHero,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  const { name, description, username, avatarUrl, songs, duration, shares,isPublic } =
    infoData;
  return (
    <>
      <button
        className="model-btn-edit-hero"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsModelOpen(true);
        }}
      >
        <h3>{name}</h3>
        <h4>{description}</h4>
        <div className="playlists-details-hero-info-owner">
          <img src={avatarUrl}></img>
          <p>{username || "TubeFy"}</p>
          <p>{shares} shares</p>
          <p>{songs} songs</p>
          <p>About {duration}</p>
        </div>
      </button>

      {isModelOpen && (
        <div className="edit-model" ref={modelRef}>
          <header className="edit-model-header">
            <h3>Edit Details</h3>
            <button className="close-btn" onClick={() => setIsModelOpen(false)}>
              <PlusSVG />
            </button>
          </header>
          <form onSubmit={onSaveHero}>
            <PlaylistEditHeroImg
              imgUrl={imgUrl}
              onUploadImg={onUploadImg}
              name={name}
            />
            <div className="playlists-details-hero-info">
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={name}
              />
              <textarea
                placeholder="Description"
                name="description"
                defaultValue={description}
              />
            </div>

            <div className="checkbox-is-public">
              <input
                type="checkbox"
                id="checkbox-public"
                defaultChecked={isPublic}
                name="isPublic"
              />
              <label htmlFor="checkbox-public">
                <div className="tick_mark"></div>
              </label>
              <p>Public?</p>
            </div>

            <button type="submit">
              <span>Save</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
