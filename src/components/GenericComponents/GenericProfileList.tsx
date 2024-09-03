import { IModelAction } from "../../models/app.model";
import GenericProfileItem from "./GenericProfileItem";

interface Props<T extends { id: string; imgUrl: string }> {
  modelActions: IModelAction<T>[];
  title: string;
  items: T[];
  children?: React.ReactNode;
}
export default function GenericProfileList<T extends { id: string; imgUrl: string }>({
  modelActions,
  title,
  items,
  children,
}: Props<T>) {
  return (
    <section className="profile-friend-list">
      {title && <h2>{title}</h2>}
      <ul className="friends-list">
        {items.map((item) => (
          <GenericProfileItem
            item={item}
            key={item.id}
            modelActions={modelActions}
          >
            {children}
          </GenericProfileItem>
        ))}
      </ul>
    </section>
  );
}
