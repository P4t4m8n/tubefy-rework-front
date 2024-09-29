import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useModel } from "../../../hooks/useModel";
import ImageUploadContainer from "./ImageUploadContainer";
import { PlusSVG, UserIconSVG } from "../../svg/SVGs";
import Loader from "../../Loader";
import { utilService } from "../../../util/util.util";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate";
import { IUserSmall } from "../../../models/user.model";
import { IPlaylist } from "../../../models/playlist.model";

interface Props {
  owner: IUserSmall;
  playlist: IPlaylist;
  onUpdatePlaylist: (HeroData: {
    imgUrlData: File | null;
    name: string;
    description: string;
    isPublic: boolean;
  }) => Promise<void>;
}

export default function PlaylistEditHeroModel({
  owner,
  playlist,
  onUpdatePlaylist,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { imgUrl, name, description, songs, duration, isPublic } = playlist;
  const { imgUrl: avatarUrl, username } = owner;

  useEffectUpdate(() => {
    if (imgUrl) setImgPreview(imgUrl);
  }, [imgUrl]);

  const handleUploadImg = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files || !ev.target.files[0]) return;
    const file = ev.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgPreview(imgUrl);
  };

  const savePlaylist = async (ev: FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      ev.preventDefault();
      ev.stopPropagation();
      const formData = new FormData(ev.currentTarget);

      const imgUrlData = formData.get("imgUrl") as File | null;
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const isPublic = !!formData.get("isPublic");

      await onUpdatePlaylist({ name, description, imgUrlData, isPublic });
    } catch (error) {
      utilService.handleError(
        "Failed to save playlist",
        "GENERAL_ERROR",
        error as Error
      );
    } finally {
      setIsLoading(false);
      setIsModelOpen(false);
    }
  };

  return (
    <div className="playlist-edit-hero-model-con">
      <button
        className="playlist-edit-hero-model-btn"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsModelOpen(true);
        }}
      >
        <h3>{name}</h3>
        <h4>{description}</h4>
        <div className="playlist-edit-hero-info-owner">
          {avatarUrl ? <img src={avatarUrl}></img> : <UserIconSVG />}
          <p>{username || "TubeFy"}</p>
          <p>{songs.length} songs</p>
          <p>About {duration}</p>
        </div>
      </button>

      {isModelOpen && (
        <div className="playlist-edit-hero-model" ref={modelRef}>
          <header className="edit-model-header">
            <h3>Edit Details</h3>
            <button className="close-btn" onClick={() => setIsModelOpen(false)}>
              <PlusSVG />
            </button>
          </header>
          <form onSubmit={savePlaylist}>
            <ImageUploadContainer
              imgUrl={imgPreview}
              onUploadImg={handleUploadImg}
              name={name}
              idForInput="-edit-model"
            />
            <div className="playlist-edit-inputs">
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={name}
              />
              <textarea
                placeholder="Description"
                name="description"
                defaultValue={description || ""}
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

            <button disabled={isLoading} type="submit">
              {isLoading ? <Loader /> : <span>Save</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
