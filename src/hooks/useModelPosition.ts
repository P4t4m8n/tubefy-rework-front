import { useState, MouseEvent, RefObject } from "react";
import { TModelSize } from "../models/app.model";

export const useModelPosition = (): {
  modelPosition: TModelSize;
  handleMouseEnter: (
    ev: MouseEvent,
    modelSize: TModelSize,
    elHeight: number
  ) => void;
  handleMouseClick: (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    parent: RefObject<HTMLElement> | null
  ) => void;
} => {
  const [modelPosition, setModelPosition] = useState<TModelSize>({
    width: 0,
    height: 0,
  });

  const handleMouseEnter = (
    ev: MouseEvent,
    modelSize: TModelSize,
    elHeight: number
  ) => {
    const position = ev.currentTarget.getBoundingClientRect();
    if (position.bottom + elHeight > window.innerHeight) {
      setModelPosition(modelSize);
    }
  };

  const handleMouseClick = (
    model: RefObject<HTMLElement> | null,
    modelSize: TModelSize,
    parent: RefObject<HTMLElement> | null
  ) => {
    const modelCon = model?.current?.getBoundingClientRect();
    console.log("modelCon:", modelCon)
    if (!modelCon) return;

    const parentCon = parent?.current?.getBoundingClientRect();
    console.log("parentCon:", parentCon)

    if (modelCon.bottom + modelSize.height > parentCon!.bottom) {
      setModelPosition({
        width: -modelSize.width,
        height: -modelSize.height,
      });
    } else if (modelCon?.right + modelSize.width > parentCon!.right) {
      if (modelCon.left - modelSize.width < 0) {
        setModelPosition({ width: 0, height: 48 });
      } else
        setModelPosition({
          width: -(modelSize.width - modelCon.width),
          height: 48,
        });
    } else {
      setModelPosition({ width: 0, height: 48 });
    }
  };

  return {
    modelPosition,
    handleMouseEnter,
    handleMouseClick,
  };
};
