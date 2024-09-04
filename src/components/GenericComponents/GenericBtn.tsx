import {
  TGenericModelBtn,
  TGenericModelFunction,
} from "../../models/genericModel.model";

export default function GenericBtn({
  uniqueText,
  btnSvg,
  imgUrl,
  text,
  className,
  onModelBtnClick,
}: TGenericModelBtn & TGenericModelFunction) {
  console.log("text:", text)
  console.log("imgUrl:", imgUrl)
  return (
    <button
      className={"generic-model-btn " + className}
      onClick={onModelBtnClick}
    >
      {text && <h2>{text}</h2>}
      {btnSvg ? btnSvg : <img src={imgUrl} alt="user" />}
      {uniqueText && uniqueText}
    </button>
  );
}
