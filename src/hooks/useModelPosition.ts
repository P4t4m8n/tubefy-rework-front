import { useState, MouseEvent } from "react";
import { IModelCoords } from "../models/app.model";

export const useModelPosition = (
  coords: IModelCoords
): {
  modelPosition: IModelCoords;
  handleMouseEnter: (
    ev: MouseEvent,
    coords: IModelCoords,
    elHeight: number
  ) => void;
  handleMouseClick: (
    ev: MouseEvent,
    coords: IModelCoords,
    elHeight: number
  ) => void;
} => {
  const [modelPosition, setModelPosition] = useState<IModelCoords>(coords);

  const handleMouseEnter = (
    ev: MouseEvent,
    coords: IModelCoords,
    elHeight: number
  ) => {
    const position = ev.currentTarget.getBoundingClientRect();
    if (position.bottom + elHeight > window.innerHeight) {
      setModelPosition(coords);
    }
  };

  const handleMouseClick = (
    ev: MouseEvent,
    coords: IModelCoords,
    elHeight: number
  ) => {
    setModelPosition(coords);
  };

  return { modelPosition, handleMouseEnter, handleMouseClick };
};
