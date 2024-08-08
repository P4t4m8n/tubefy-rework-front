import { ReactNode, isValidElement, cloneElement, ReactElement } from "react";
import { useAppSelector } from "../hooks/useStore";
import { Navigate } from "react-router-dom";
import { IUser } from "../models/user.model";

interface Props {
  children: ReactNode;
}
interface ChildProps {
  user: IUser;
}

export const AuthProtectedRoute = ({ children }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement<ChildProps>, { user });
  }

  return <>{children}</>;
};