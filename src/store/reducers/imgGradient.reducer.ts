import {
  IImageGradientState,
  SET_IMAGE_GRADIENT,
  SET_IMAGE_URL,
  TAppActionTypes,
} from "../../models/imgGradient.model";

const initialState: IImageGradientState = {
  imgUrl: null,
  gradient: null,
};

export const imgGradientReducer = (
  state = initialState,
  action: TAppActionTypes
): IImageGradientState => {
  switch (action.type) {
    case SET_IMAGE_URL:
      return { ...state, imgUrl: action.payload };
    case SET_IMAGE_GRADIENT:
      return { ...state, gradient: action.payload };
    default:
      return state;
  }
};
