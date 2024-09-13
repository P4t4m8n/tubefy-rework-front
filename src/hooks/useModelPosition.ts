import { useState, RefObject } from "react";
import { TModelSize } from "../models/app.model";

export const useModelPosition = (): {
  modelPosition: TModelSize;
  isExpendUp: boolean;

  handleMouseClick: (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    parent: RefObject<HTMLElement> | null
  ) => void;
  handleExpendDirection: (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    container: RefObject<HTMLElement> | null,
    parent: RefObject<HTMLElement> | null
  ) => void;
  setIsExpendUp: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [modelPosition, setModelPosition] = useState<TModelSize>({
    width: 0,
    height: 0,
  });

  const [isExpendUp, setIsExpendUp] = useState(false);

  const handleMouseClick = (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    parent: RefObject<HTMLElement> | null
  ) => {
    const currentModel = model?.current;
    const currentParent = parent?.current;

    if (!currentModel || !currentParent) return;

    const modelCon = currentModel.getBoundingClientRect();
    const parentCon = currentParent.getBoundingClientRect();

    if (modelCon.bottom + modelSize.height + 28 > parentCon!.bottom) {
      //Add an up class for css check on how to open the sub menu
      currentModel.classList.add("up");
      setModelPosition({
        width: -modelSize.width,
        height: -modelSize.height,
      });
    } else if (modelCon?.right + modelSize.width > parentCon!.right) {
      if (modelCon.left - modelSize.width < 0) {
        setModelPosition({ width: 0, height: 48 });
      } else {
        //Add an down class for css check on how to open the sub menu
        currentModel.classList.add("down");
        setModelPosition({
          width: -(modelSize.width - modelCon.width),
          height: 48,
        });
      }
    } else {
      setModelPosition({ width: 0, height: 48 });
    }
  };

  const handleExpendDirection = (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    container: RefObject<HTMLElement> | null,
    parent: RefObject<HTMLElement> | null
  ) => {
    const modelCon = model?.current?.getBoundingClientRect();
    if (!modelCon) return;

    const containerCon = container?.current?.getBoundingClientRect();
   

    if (modelCon.bottom + modelSize.height + 28 > containerCon!.bottom) {
      //Add where to expend to parent controlled by css
      parent?.current?.classList.add("extend-up");

      setIsExpendUp(true);
    }
  };

  return {
    modelPosition,
    isExpendUp,
    setIsExpendUp,
    handleMouseClick,
    handleExpendDirection,
  };
};
