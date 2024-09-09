import { MouseEvent } from "react";

type BtnSvgProps = {
  btnSvg: JSX.Element;
  imgUrl?: never;
};

type ImgUrlProps = {
  btnSvg?: never;
  imgUrl: string;
};

export type TGeneralBtn = {
  onModelBtnClick: (ev?: MouseEvent) => void;
  className?: string;
  text?: string;
} & (BtnSvgProps | ImgUrlProps);
