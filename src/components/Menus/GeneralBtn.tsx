import { TGenericModelBtn } from "../../models/genericModel.model";

export default function GeneralBtn({
  btnSvg,
  imgUrl,
  text,
  className,
  onModelBtnClick,
}: TGenericModelBtn) {
  return (
    <button
      className={"general-model-btn " + className}
      onClick={onModelBtnClick}
    >
      {text && <h2>{text}</h2>}
      {btnSvg && btnSvg}
      {imgUrl && <img src={imgUrl} alt="user" />}
    </button>
  );
}
