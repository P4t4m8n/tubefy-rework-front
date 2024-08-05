import { useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { Link } from "react-router-dom";
import { IGenericModelItem } from "../../models/app.model";

interface Props {
  children?: React.ReactNode;
  items?: IGenericModelItem[];
  btnSvg: JSX.Element;
}

export default function GenericModel({ children, items, btnSvg }: Props) {
  const modelRef = useRef<HTMLUListElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(modelRef);

  return (
    <>
      <button
        className="generic-model-btn"
        onClick={() => setIsModelOpen(true)}
      >
        {btnSvg}
      </button>
      {isModelOpen && (
        <ul className="generic-model" ref={modelRef}>
          {children}
          {items &&
            items.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link to={item.link}>
                    {item.svg}
                    <span>{item.text}</span>
                  </Link>
                ) : (
                  <button onClick={item.onClick}>
                    {item.svg}
                    <span>{item.text}</span>
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
