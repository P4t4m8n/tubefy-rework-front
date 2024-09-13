import { IScreenAction, IScreenState } from "../../models/screen.mode";

const initialState: IScreenState = {
  isMobile: window.innerWidth < 640,
};

export const screenReducer = (
  state = initialState,
  action: IScreenAction
): IScreenState => {
  switch (action.type) {
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};
