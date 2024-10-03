import { ReactNode, isValidElement, cloneElement, ReactElement } from "react";
import { useAppSelector } from "../hooks/useStore";
import { Navigate } from "react-router-dom";
import { IUserSmall } from "../models/user.model";
import { utilService } from "../util/util.util";

interface Props {
  children: ReactNode;
}
interface ChildProps {
  user: IUserSmall;
}

export const AuthProtectedRoute = ({ children }: Props) => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    utilService.handleError(
      "You need to be logged in to access this page",
      "GENERAL_ERROR",
      new Error("No user found")
    );
    return <Navigate to="/" />;
  }

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement<ChildProps>, { user });
  }

  return <>{children}</>;
};
