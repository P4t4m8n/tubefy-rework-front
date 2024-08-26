import {
  SET_IMAGE_GRADIENT,
  SET_IMAGE_URL,
} from "../../models/imgGradient.model";
import { store } from "../store";

export const setImg = (url: string) => ({
  type: SET_IMAGE_URL,
  payload: url,
});

export const setGradient = (gradient: string|null) => ({
  type: SET_IMAGE_GRADIENT,
  payload: gradient,
});

export const setImgForBackground = (url: string) => {
  store.dispatch(setImg(url));
};

export const setGradientForBackground = (gradient: string|null) => {
  store.dispatch(setGradient(gradient));
};
