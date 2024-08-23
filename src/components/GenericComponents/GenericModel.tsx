import { MouseEvent, ReactNode, useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { useNavigate } from "react-router-dom";
import { IGenericModelItem } from "../../models/app.model";
import { useModelPosition } from "../../hooks/useModelPosition";

interface Props {
  children?: ReactNode;
  uniqueButton?: ReactNode;
  items?: IGenericModelItem[];
  btnSvg?: JSX.Element;
  imgUrl?: string;
  idKey?: string;
}

export default function GenericModel({
  children,
  items,
  btnSvg,
  imgUrl,
  idKey,
  uniqueButton,
}: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const navigate = useNavigate();

  const { modelPosition, handleMouseClick } = useModelPosition({ x: 0, y: 24 });

  const onModelBtnClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    handleMouseClick(ev, { x: 0, y: -112 }, 102);
    setIsModelOpen((prev) => !prev);
  };

  const handleClick = async (
    ev: MouseEvent,
    item?: (ev: MouseEvent) => void
  ) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (item) {
      await item(ev);
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
    <div key={idKey} ref={modelRef} className="generic-model-con">
      <button
        key={idKey}
        className="generic-model-btn"
        onClick={onModelBtnClick}
      >
        {btnSvg && !uniqueButton ? btnSvg : <img src={imgUrl} alt="user" />}
        {uniqueButton}
      </button>
      {isModelOpen && (
        <ul style={{ top: modelPosition.y }} className="generic-model">
          {children}
          {items &&
            items.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <button onClick={(ev) => handleLink(ev, item.link)}>
                    <span>{item.text}</span>
                    {item.svg}
                  </button>
                ) : (
                  <button onClick={(ev) => handleClick(ev, item.onClick)}>
                    <span>{item.text}</span>
                    {item.svg}
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
