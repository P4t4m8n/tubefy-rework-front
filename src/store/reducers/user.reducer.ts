import {
  IUserAction,
  IUserState,
  TUserActionType,
} from "../../models/user.model";
import { userService } from "../../services/user.service";

const actionTypes: Record<TUserActionType, TUserActionType> = {
  SET_USER: "SET_USER",
  EDIT_USER: "EDIT_USER",
} as const;

const initialState: IUserState = {
  user: userService.getLoggedinUser(),
};

export function userReducer(
  state = initialState,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    case actionTypes.EDIT_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
