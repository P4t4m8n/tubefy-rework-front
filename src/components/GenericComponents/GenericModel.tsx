import { MouseEvent, ReactNode, useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { useNavigate } from "react-router-dom";
import { IGenericModelItem } from "../../models/app.model";

interface Props {
  children?: ReactNode;
  uniqueButton?: ReactNode;
  items?: IGenericModelItem[];
  btnSvg?: JSX.Element;
  imgUrl?: string;
}

export default function GenericModel({
  children,
  items,
  btnSvg,
  imgUrl,
  uniqueButton,
}: Props) {
  const modelRef = useRef<HTMLUListElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  const navigate = useNavigate();

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
    <>
      <button
        className="generic-model-btn"
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          setIsModelOpen(true);
        }}
      >
        {btnSvg && !uniqueButton ? btnSvg : <img src={imgUrl} alt="user" />}
        {uniqueButton}
      </button>
      {isModelOpen && (
        <ul className="generic-model" ref={modelRef}>
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
    </>
  );
}
