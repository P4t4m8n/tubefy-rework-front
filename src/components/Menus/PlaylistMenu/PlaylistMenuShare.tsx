import { MouseEvent, RefObject, useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import GenericModelBtn from "../../GenericComponents/GenericBtn";
import { ShareSVG } from "../../svg/SVGs";
import { useModelPosition } from "../../../hooks/useModelPosition";
import { IModelItem, TModelSize } from "../../../models/app.model";
import GenericBtn from "../../GenericComponents/GenericBtn";

interface Props {
  items: IModelItem[];
  modelClass: string;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  key: number;
}

export default function PlaylistMenuShare({
  modelSize,
  modelClass,
  container,
  items,
  key,
}: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { isExtendUp, handleMouseClick } = useModelPosition();

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    if (isModelOpen) {
      setIsModelOpen(false);
      return;
    }
    handleMouseClick(modelRef, modelSize, container);
    setIsModelOpen(true);
  };

  return (
    <li
      key={key}
      ref={modelRef}
      className={`${modelClass}-share-con ${isModelOpen && "extend"} ${
        isExtendUp && "extend-up"
      }`}
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
              <GenericBtn
                imgUrl={item.imgUrl!}
                text={item.text}
                onModelBtnClick={async () => item.onClick}
                className={`${modelClass}}-item-share-btn`}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
