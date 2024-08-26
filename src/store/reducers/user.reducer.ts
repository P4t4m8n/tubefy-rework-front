import { IUserAction, IUserState, SET_USER } from "../../models/user.model";
import { userService } from "../../services/auth.service";

const initialState: IUserState = {
  user: userService.getLoggedinUser(),
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
