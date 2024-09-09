import { MouseEvent } from "react";

// This is a model for a generic button component that can be used in multiple places

type BtnSvgProps = {
  btnSvg: JSX.Element;
  imgUrl?: never;
};

type ImgUrlProps = {
  btnSvg?: never;
  imgUrl: string;
};

export type TGenericModelBtn = {
  onModelBtnClick: (ev?: MouseEvent) => void;
  className?: string;
  text?: string;
} & (BtnSvgProps | ImgUrlProps);

export interface IModelData {
  btnSvg: JSX.Element;
  className: string;
  modelSize: {
    x: number;
    y: number;
  };
  parentRef: React.RefObject<HTMLDivElement>;
}
