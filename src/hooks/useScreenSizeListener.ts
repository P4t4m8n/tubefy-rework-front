import { handleScreenMobile } from "../store/actions/screen.actions";
import { useEffectUpdate } from "./useEffectUpdate";
import { useAppSelector } from "./useStore";

export const useScreenSizeListener = () => {
  const isMobile = useAppSelector((state) => state.screen.isMobile);

  useEffectUpdate(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const isMobile = mediaQuery.matches;

    // Initial dispatch to set the screen size
    handleScreenMobile(isMobile);

    // Listener for changes in screen size
    const handleScreenChange = (e: MediaQueryListEvent) => {
      handleScreenMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return { isMobile };
};
