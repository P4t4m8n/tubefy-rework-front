import { MouseEvent, RefObject, useRef } from "react";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { useModel } from "../../../hooks/useModel";
import GeneralBtn from "../GeneralBtn";
import { useModelPosition } from "../../../hooks/useModelPosition";

interface Props {
  items: IModelItem[];
  modelClass: string;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  text: string;
  btnSvg?: JSX.Element;
  imgUrl?: string;
  parentRef: RefObject<HTMLDivElement | HTMLUListElement>;
}
export default function SongMenuSlide({
  items,
  modelClass,
  text,
  modelSize,
  container,
  btnSvg,
  imgUrl,
  parentRef,
}: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef, handleCloseModel);
  const { isExpendUp, setIsExpendUp, handleExpendDirection } =
    useModelPosition();

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    if (isModelOpen) {
      handleCloseModel();
      return;
    }
    handleExpendDirection(modelRef, modelSize, container, parentRef);
    setIsModelOpen(true);
  };

  function handleCloseModel() {
    parentRef.current?.classList.remove("extend-up");
    setIsExpendUp(false);
    setIsModelOpen(false);
    return;
  }

  return (
    <li
      ref={modelRef}
      className={`${modelClass}-share-con ${isModelOpen && "extend"} ${
        isExpendUp ? "extend-up" : ""
      } `}
    >
      <GeneralBtn
        {...(imgUrl ? { imgUrl } : { btnSvg: btnSvg! })}
        text={text}
        onModelBtnClick={onOpenModel}
        className={`${modelClass}-share-btn`}
      />
      {isModelOpen && (
        <ul className={`${modelClass}-share`}>
          {items.map((item, idx) => (
            <li className={`${modelClass}-item-share`} key={idx}>
              <GeneralBtn
                imgUrl={item.imgUrl!}
                text={item.text}
                onModelBtnClick={() => item.onClick!()}
                className={`${modelClass}-share-btn`}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
