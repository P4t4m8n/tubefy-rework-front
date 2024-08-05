const createArrayFromType = <T extends string>(obj: {
  [K in T]: K;
}): T[] => {
  return Object.keys(obj) as T[];
};

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

export const utilService = {
  createArrayFromType,
  debounce,
  getRandomIntInclusive,
  getDaysSince,
};
