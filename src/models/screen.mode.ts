const SET_IS_MOBILE = "SET_IS_MOBILE";

export type TScreenActionType = typeof SET_IS_MOBILE;

export interface IScreenAction {
  type: TScreenActionType;
  payload: boolean;
}

export interface IScreenState {
  isMobile: boolean;
}
