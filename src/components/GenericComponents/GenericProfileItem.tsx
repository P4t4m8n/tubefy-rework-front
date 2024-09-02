import { IModelAction } from "../../models/app.model";

interface Props<T> {
  modelActions: IModelAction<T>[];
  item: T;
}
export default function GenericProfileItem({ modelActions, item }: Props) {
  return <div>GenericProfileItem</div>;
}
