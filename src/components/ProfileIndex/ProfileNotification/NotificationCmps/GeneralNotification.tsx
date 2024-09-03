import { Link } from "react-router-dom";
import { INotification } from "../../../../models/notification.model";
import { RejectSVG } from "../../../svg/SVGs";

interface Props {
  notification: INotification;
  link?: string;
  linkText?: string;
  onRemoveNotification: (id: string) => Promise<void>;
}
export default function GeneralNotification({
  notification,
  onRemoveNotification,
  link,
  linkText,
}: Props) {
  const { text, imgUrl, id } = notification;
  return (
    <li className="notification-list-item">
      <img src={imgUrl}></img>
      <h3>{text}</h3>
      {link && linkText && <Link to={link}>{linkText}</Link>}
      <button
        onClick={() => onRemoveNotification(id!)}
        className="notification-list-item-delete-btn"
      >
        <RejectSVG />
      </button>
    </li>
  );
}
