//Redux
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const SET_IMAGE_GRADIENT = "SET_IMAGE_GRADIENT";
export type TAppActionTypes = ISetImgUrlAction | ISetImgGradientAction;
export interface IImageGradientState {
  imgUrl: string | null;
  gradient: string | null;
}
export interface ISetImgGradientAction {
  type: typeof SET_IMAGE_GRADIENT;
  payload: string;
}
export interface ISetImgUrlAction {
  type: typeof SET_IMAGE_URL;
  payload: string;
}
