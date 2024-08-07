import { useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { Link } from "react-router-dom";
import { IGenericModelItem } from "../../models/app.model";

interface Props {
  children?: React.ReactNode;
  items?: IGenericModelItem[];
  btnSvg?: JSX.Element;
  imgUrl?: string;
}

export default function GenericModel({
  children,
  items,
  btnSvg,
  imgUrl,
}: Props) {
  const modelRef = useRef<HTMLUListElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  return (
    <>
      <button
        className="generic-model-btn"
        onClick={(ev) => {
          ev.stopPropagation();
          setIsModelOpen(true)}}
      >
        {btnSvg ? btnSvg : <img src={imgUrl} alt="user" />}
      </button>
      {isModelOpen && (
        <ul className="generic-model" ref={modelRef}>
          {children}
          {items &&
            items.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link to={item.link}>
                    <span>{item.text}</span>
                    {item.svg}
                  </Link>
                ) : (
                  <button onClick={item.onClick}>
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
