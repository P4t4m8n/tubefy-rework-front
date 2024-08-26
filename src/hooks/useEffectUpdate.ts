import { useEffect, useRef } from "react";

export const useEffectUpdate = (
  callBack: () => void,
  dependencies: unknown[]
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callBack();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
};
