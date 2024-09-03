import { ChangeEvent } from "react";
import { NoteSVG, PencilSVG } from "../../svg/SVGs";

interface Props {
  imgUrl: string|null;
  name: string;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  idForInput?: string;
}
export default function PlaylistEditHeroImg({
  imgUrl,
  name,
  onUploadImg,
  idForInput,
}: Props) {
  console.log("imgUrl:", imgUrl)
  return (
    <label
      className="img-upload-con"
      htmlFor={"img-upload" + idForInput}
      onClick={(ev) => ev.stopPropagation()}
    >
      <input
        type="file"
        id={"img-upload" + idForInput}
        name="imgUrl"
        hidden
        onChange={(ev) => {
          ev.stopPropagation();
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
