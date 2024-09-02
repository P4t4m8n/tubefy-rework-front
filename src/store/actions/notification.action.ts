import {
  INotification,
  INotificationAction,
} from "../../models/notification.model";
import { storeSessionData } from "../../services/localSession.service";
import { notificationService } from "../../services/notification.service";
import { utilService } from "../../util/util.util";
import { store } from "../store";

const setNotification = (
  notifications: INotification[]
): INotificationAction => ({
  type: "SET_NOTIFICATIONS",
  payload: notifications,
});

export const loadNotifications = (notifications: INotification[]) => {
  try {
    storeSessionData("notifications", notifications);
    store.dispatch(setNotification(notifications));
  } catch (error) {
    utilService.handleError(
      "loading notifications -> notification.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const removeNotificationServer = async (notificationId: string) => {
  try {
    await notificationService.remove(notificationId);
    removeNotification(notificationId);
  } catch (error) {
    utilService.handleError(
      "removing notification -> notification.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};
export const removeNotification = async (notificationId: string) => {
  try {
    const notifications = store.getState().notification.notifications;
    const newNotifications = notifications?.filter(
      (notification) => notification.id !== notificationId
    );
    loadNotifications(newNotifications || []);
  } catch (error) {
    utilService.handleError(
      "removing notification -> notification.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};

export const addNotification = (notification: INotification) => {
  try {
    const notifications = store.getState().notification.notifications;
    loadNotifications([...(notifications || []), notification]);
  } catch (error) {
    utilService.handleError(
      "adding notification -> notification.action",
      "GENERAL_ERROR",
      error as Error
    );
  }
};
