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
}

export default function PlaylistMenuShare({
  modelSize,
  modelClass,
  container,
  items,
  elKey,
}: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { handleMouseClick } = useModelPosition();

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
      key={elKey + 15}
      ref={modelRef}
      className={`${modelClass}-share-con ${isModelOpen && "extend"} `}
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
