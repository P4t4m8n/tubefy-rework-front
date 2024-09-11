import { INotification, TNotificationType } from "../models/notification.model";
import { showUserMsg } from "../services/eventEmitter";

const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  delay = 2000
): ((...args: Args) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: Args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDaysSince = (dateString: string): number => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - inputDate.getTime();

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsInOneDay
  );

  return differenceInDays;
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = Math.floor(Math.random() * 128);
    color += letters[Math.floor(value / 16)] + letters[value % 16];
  }
  return color;
};

const handleError = (action: string, type: TNotificationType, error: Error) => {
  console.error(`Error in ${action}`, error);
  showUserMsg({
    text: `Error in ${action}`,
    type,
    status: "error",
    imgUrl: "/error-img.jpg",
  });
};

const handleSuccess = (
  action: string,
  type: TNotificationType,
  imgUrl?: string
) => {
  showUserMsg({
    text: `${action}`,
    type,
    status: "success",
    imgUrl: imgUrl || "/success-img.jpg",
  });
};

const handleNotificationMsg = (notification: INotification) => {
  showUserMsg({ ...notification, status: "success" });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(this, args);
    }
    return lastResult;
  };
};

export const utilService = {
  debounce,
  getRandomIntInclusive,
  getDaysSince,
  getRandomColor,
  handleSuccess,
  handleError,
  handleNotificationMsg,
  throttle,
};
