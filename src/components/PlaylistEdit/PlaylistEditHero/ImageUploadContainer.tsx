import { ChangeEvent } from "react";
import { NoteSVG, PencilSVG } from "../../svg/SVGs";

interface Props {
  imgUrl?: string | null;
  svg?: JSX.Element;
  name: string;
  onUploadImg: (ev: ChangeEvent<HTMLInputElement>) => void;
  idForInput?: string;
}
export default function ImageUploadContainer({
  imgUrl,
  name,
  onUploadImg,
  svg = <NoteSVG />,
  idForInput,
}: Props) {
  return (
    <>
    <label
      className="img-upload-con"
      htmlFor={`img-upload ${idForInput}`}
      onClick={(ev) => ev.stopPropagation()}
    >
     
      {imgUrl ? <img src={imgUrl} alt={name}></img> : svg}
      <div className="img-upload-hover">
        <PencilSVG />
        <p>Choose Photo</p>
      </div>
    </label>
     <input
     type="file"
     id={`img-upload ${idForInput}`}
     name="imgUrl"
     hidden
     onChange={(ev) => {
       console.log("ev:", ev);
       ev.stopPropagation();
       onUploadImg(ev);
     }}
   />
  </>
  );
}
