const createArrayFromType = <T extends string>(obj: {
  [K in T]: K;
}): T[] => {
  return Object.keys(obj) as T[];
};

type DebounceFunction = <T extends (args: unknown) => unknown>(
  func: T,
  wait: number
) => (...args: Parameters<T>) => void;

const debounce: DebounceFunction = (func, wait) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<typeof func>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(args);
    }, wait);
  };
};

const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const utilService = {
  createArrayFromType,
  debounce,
  getRandomIntInclusive,
};
