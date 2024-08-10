import { ChangeEvent } from "react";
import { NoteSVG, PencilSVG } from "../../svg/SVGs";

interface Props {
  imgUrl: string;
  name: string;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
}
export default function PlaylistEditHeroImg({
  imgUrl,
  name,
  onUploadImg,
}: Props) {
  return (
    <label
      className="img-upload-con"
      htmlFor="img-upload"
      onClick={(ev) => ev.stopPropagation()}
    >
      <input
        type="file"
        id="img-upload"
        name="imgUrl"
        hidden
        onChange={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          onUploadImg(ev);
        }}
      />
      {imgUrl ? <img src={imgUrl} alt={name}></img> : <NoteSVG />}
      <div className="img-upload-hover">
        <PencilSVG />
        <p>Choose Photo</p>
      </div>
    </label>
  );
}
