import { IScreenAction } from "../../models/screen.mode";
import { utilService } from "../../util/util.util";
import { store } from "../store";

export const handleScreenMobile = (isMobile: boolean) => {
  try {
    store.dispatch(setIsMobile(isMobile));
    return;
  } catch (error) {
    utilService.handleError(
      "Unable to set mobile size",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

const setIsMobile = (isMobile: boolean): IScreenAction => ({
  type: "SET_IS_MOBILE",
  payload: isMobile,
});
