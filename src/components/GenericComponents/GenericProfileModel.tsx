import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { ArrowSVG } from "../svg/SVGs";
import { IModelAction } from "../../models/app.model";

interface Props<T> {
  modelActions: IModelAction<T>[];
  item: T;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GenericProfileModel<T>({
  modelActions,
  item,
  setModelOpen,
}: Props<T>) {
  const handleClick = async (
    ev: MouseEvent,
    action?: (item: T, ev?: MouseEvent) => void | Promise<void>
  ) => {
    try {
      ev.stopPropagation();
      if (action) {
        await action(item, ev);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModelOpen(false);
    }
  };

  return (
    <section className="generic-profile-model-con">
      <ul className="generic-profile-model">
        {modelActions.map((action, i) => (
          <li className="generic-profile-model-item" key={i}>
            {action.action ? (
              <button
                className="generic-profile-model-item-action"
                onClick={(ev) => handleClick(ev, action.action)}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ) : (
              <Link to={action.link!}>
                {action.icon}
                <span>{action.text}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <button
        className="generic-profile-model-btn"
        onClick={() => setModelOpen((prev) => !prev)}
      >
        <ArrowSVG />
      </button>
    </section>
  );
}
