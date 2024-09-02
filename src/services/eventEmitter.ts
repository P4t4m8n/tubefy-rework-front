import { INotificationProps } from "../models/notification.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TListener<T = any> = (data: T) => void;
type TListenersMap = Record<string, TListener[]>;

export const SHOW_MSG = "show-msg";

const createEventEmitter = (): {
  on<T>(evName: string, listener: TListener<T>): () => void;
  emit<T>(evName: string, data: T): void;
} => {
  const listenersMap: TListenersMap = {};

  return {
    on<T>(evName: string, listener: TListener<T>) {
      // Ensure the event name exists in the map or initialize it
      listenersMap[evName] = listenersMap[evName] || [];
      listenersMap[evName].push(listener);

      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        );
      };
    },

    emit<T>(evName: string, data: T) {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
};

export const eventBus = createEventEmitter();

export const showUserMsg = (notification: INotificationProps) => {
  if (!notification?.imgUrl) {
    notification.imgUrl =
      notification.status === "success"
        ? "/img/success-img.jpg"
        : "/img/error-img.jpg";
  }
  eventBus.emit<INotificationProps>(SHOW_MSG, notification);
  return;
};
