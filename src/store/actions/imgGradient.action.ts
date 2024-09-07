import {
  SET_IMAGE_GRADIENT,
  SET_IMAGE_URL,
} from "../../models/imgGradient.model";
import { store } from "../store";
import { utilService } from "../../util/util.util";

export const setImgForBackground = (url: string) => {
  try {
    store.dispatch(setImg(url));
  } catch (error) {
    utilService.handleError(
      "Error setting image background",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const setGradientForBackground = (gradient: string | null) => {
  try {
    store.dispatch(setGradient(gradient));
  } catch (error) {
    utilService.handleError(
      "Error setting gradient background",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const setImg = (url: string) => ({
  type: SET_IMAGE_URL,
  payload: url,
});

const setGradient = (gradient: string | null) => ({
  type: SET_IMAGE_GRADIENT,
  payload: gradient,
});
