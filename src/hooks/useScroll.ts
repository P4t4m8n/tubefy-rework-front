import { RefObject, useState } from "react";

export const useScroll = (ref: RefObject<Element> | null) => {
  const [backVisible, setBackVisible] = useState(false);

  const onScrollBy = (dir: number) => {
    if (!ref || !ref.current) return;

    ref.current.scrollBy({
      left: dir,
      behavior: "smooth",
    });

    // Delay the check to allow the scroll to complete
    setTimeout(() => {
      if (ref.current && ref.current.scrollLeft > 0) {
        setBackVisible(true);
      } else {
        setBackVisible(false);
      }
    }, 200);
  };

  return { backVisible, onScrollBy };
};
