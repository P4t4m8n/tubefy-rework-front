import { IUserAction, IUserState, SET_USER } from "../../models/user.model";
import { getSessionData } from "../../services/localSession.service";

const initialState: IUserState = {
  user: getSessionData("user"),
};

export function userReducer(
  state = initialState,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
