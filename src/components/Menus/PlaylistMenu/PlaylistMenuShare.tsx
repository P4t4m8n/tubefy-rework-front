import { MouseEvent, RefObject, useRef } from "react";

import { useModel } from "../../../hooks/useModel";
import { ShareSVG } from "../../svg/SVGs";
import { useModelPosition } from "../../../hooks/useModelPosition";
import { IModelItem, TModelSize } from "../../../models/app.model";

import GenericModelBtn from "../GeneralBtn";
import GeneralBtn from "../GeneralBtn";

interface Props {
  items: IModelItem[];
  modelClass: string;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  elKey: number;
  parentRef: RefObject<HTMLDivElement | HTMLUListElement>;
}

export default function PlaylistMenuShare({
  modelSize,
  modelClass,
  container,
  items,
  elKey,
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
      key={elKey + 15}
      ref={modelRef}
      className={`${modelClass}-share-con ${isModelOpen && "extend"} ${
        isExpendUp ? "extend-up" : ""
      } `}
    >
      <GenericModelBtn
        btnSvg={<ShareSVG />}
        text="Share Playlist"
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
                onModelBtnClick={async () => item.onClick!()}
                className={`${modelClass}}-item-share-btn`}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
