import { MouseEvent } from "react";

export interface IGenericModelItem {
  svg?: JSX.Element;
  text?: string;
  link?: string;
  onClick?: (ev?: MouseEvent) => void;
}

export interface IModelCoords {
  x: number;
  y: number;
}


