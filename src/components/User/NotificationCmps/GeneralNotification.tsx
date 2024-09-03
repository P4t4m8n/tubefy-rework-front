import { INotification } from "../../../models/notification.model";

interface Props {
  notification: INotification;
}

export default function GeneralNotification({ notification }: Props) {
  console.log("notification:", notification);
  return <div></div>;
}
