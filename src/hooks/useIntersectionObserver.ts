import { RefObject, useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";
import { utilService } from "../util/util.util";

export const useIntersectionObserver = (
  sentinelRef: RefObject<HTMLDivElement>,
  isLoading?: boolean
) => {
  const [isActive, setIsActive] = useState(false);

  useEffectUpdate(() => {
    const sentinel = sentinelRef.current;
    if (sentinel) {
      const observer = new IntersectionObserver(
        utilService.throttle((entries) => {
          setIsActive(!entries[0].isIntersecting);
        }, 100),
        {
          threshold: [0.1],
        }
      );

      observer.observe(sentinel);

      return () => {
        observer.unobserve(sentinel);
        observer.disconnect();
      };
    }
  }, [isLoading]);
  return isActive;
};
