import {
  INotificationAction,
  INotificationState,
} from "../../models/notification.model";
import { getSessionData } from "../../services/localSession.service";

const initialState: INotificationState = {
  notifications: getSessionData("notifications"),
};

export const notificationReducer = (
  state = initialState,
  action: INotificationAction
): INotificationState => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};
