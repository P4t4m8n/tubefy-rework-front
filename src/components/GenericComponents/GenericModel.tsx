import { MouseEvent, useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { useNavigate } from "react-router-dom";
import { IGenericModelItem, IModelCoords } from "../../models/app.model";
import { useModelPosition } from "../../hooks/useModelPosition";
import GenericBtn from "./GenericBtn";

interface Props {
  items: IGenericModelItem[];
  btnSvg?: JSX.Element;
  btnText?: string;
  imgUrl?: string;
  idKey?: string;
  className?: string;
  coords?: IModelCoords;
  modelSize?: IModelCoords;
}

export default function GenericModel({
  items,
  btnSvg,
  btnText,
  imgUrl,
  idKey,
  coords,
  className,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const { modelPosition, handleMouseClick } = useModelPosition({ x: 0, y: 0 });
  const navigate = useNavigate();

  const onModelBtnClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    handleMouseClick(ev, coords ? coords : { x: 0, y: 24 }, 200);
    setIsModelOpen((prev) => !prev);
  };

  const handleClick = async (
    ev: MouseEvent,
    item?: (ev: MouseEvent) => void
  ) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (item) {
      item(ev);
      setIsModelOpen(false);
    }
    return;
  };

  const handleLink = (ev: MouseEvent, link?: string) => {
    ev.stopPropagation();
    ev.preventDefault();

    if (!link) {
      navigate("/");
      return;
    }
    navigate(link);
    setIsModelOpen(false);
    return;
  };

  return (
    <div
      key={idKey}
      ref={modelRef}
      className={"generic-model-con " + className}
    >
      <GenericBtn
        onModelBtnClick={onModelBtnClick}
        {...(imgUrl ? { imgUrl } : { btnSvg: btnSvg! })}
        text={btnText}
        className={className}
      />

      {isModelOpen && (
        <ul
          style={{ top: modelPosition.y, left: modelPosition.x }}
          className="generic-model"
        >
          {items.map((item, index) => (
            <li key={index}>
              {!item.children && item.link && (
                <GenericBtn
                  onModelBtnClick={(ev) => handleLink(ev, item.link)}
                  text={item.text}
                  btnSvg={item.btnSvg!}
                />
              )}
              {!item.children && item.onClick && (
                <GenericBtn
                  onModelBtnClick={(ev) => handleClick(ev, item.onClick)}
                  text={item.text}
                  {...(item.imgUrl
                    ? { imgUrl: item.imgUrl! }
                    : { btnSvg: item.btnSvg! })}
                />
              )}

              {item.children && (
                <GenericModel
                  items={item.children}
                  btnSvg={item.btnSvg}
                  btnText={item.text}
                  className={`${className}-sub-model`}
                  coords={item.coords}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
