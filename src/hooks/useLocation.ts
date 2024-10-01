import { useLocation } from "react-router-dom";

export const useNavLocation = () => {
  const location = useLocation();
  const checkLocation = (path: string) => {
    return location.pathname.includes(path);
  };

  return { location, checkLocation };
};
