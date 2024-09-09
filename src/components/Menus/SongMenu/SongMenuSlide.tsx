import { MouseEvent, RefObject, useRef } from "react";
import { IModelItem, TModelSize } from "../../../models/app.model";
import { useModel } from "../../../hooks/useModel";
import GeneralBtn from "../GeneralBtn";

interface Props {
  items: IModelItem[];
  modelClass: string;
  container: RefObject<HTMLDivElement | HTMLUListElement>;
  modelSize: TModelSize;
  text: string;
  btnSvg?: JSX.Element;
  imgUrl?: string;
}
export default function SongMenuSlide({
  items,
  modelClass,
  text,
  btnSvg,
  imgUrl,
}: Props) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  const onOpenModel = (ev?: MouseEvent) => {
    ev!.preventDefault();
    if (isModelOpen) {
      setIsModelOpen(false);
      return;
    }
    setIsModelOpen(true);
  };

  return (
    <li
      ref={modelRef}
      className={`${modelClass}-share-con ${isModelOpen && "extend"} `}
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
