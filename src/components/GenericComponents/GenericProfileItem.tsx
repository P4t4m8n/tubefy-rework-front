import { ReactNode, useRef } from "react";
import { IModelAction } from "../../models/app.model";
import { useModel } from "../../hooks/useModel";
import GenericProfileModel from "./GenericProfileModel";

interface Props<T extends { imgUrl: string; text: string }> {
  modelActions: IModelAction<T>[];
  item: T;
  extraInfo?: ReactNode;
}
export default function GenericProfileItem<
  T extends { imgUrl: string; text: string }
>({ modelActions, item }: Props<T>) {
  const modelRef = useRef<HTMLLIElement>(null);
  const [isModelOpen, setModelOpen] = useModel(modelRef);

  const openClass = isModelOpen ? "open" : "";

  return (
    <li ref={modelRef} className={"share-playlist-notification " + openClass}>
      <img src={item.imgUrl}></img>
      <h3>{item.text}</h3>

      <GenericProfileModel
        item={item}
        modelActions={modelActions}
        setModelOpen={setModelOpen}
      />
    </li>
  );
}
