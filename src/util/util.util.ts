 const createArrayFromType = <T extends string>(obj: {
  [K in T]: K;
}): T[] => {
  return Object.keys(obj) as T[];
};

type DebounceFunction = <T extends (args: any) => unknown>(
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
      func(...args);
    }, wait);
  };
};

export const utilService = {
  createArrayFromType,
  debounce,
};
