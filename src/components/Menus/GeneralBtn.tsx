import { TGeneralBtn } from "../../models/generalBtn.model";

export default function GeneralBtn({
  btnSvg,
  imgUrl,
  text,
  className,
  onModelBtnClick,
}: TGeneralBtn) {
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
