import { TInputUserFormKeys } from "../models/app.model";
import { IUserDTO } from "../models/user.model";
import { loginInputs } from "./constants.util";

export type TGreetings =
  | "Good night"
  | "Good morning"
  | "Good afternoon"
  | "Good evening"
  | "Good day";

export const getGreeting = (): TGreetings => {
  const now = new Date();
  const hour = now.getHours();

  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 22:
    case 23:
      return "Good night";
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return "Good morning";
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      return "Good afternoon";
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      return "Good evening";
    default:
      return "Good day";
  }
};

export const getLoginInputs = (
  isLogin: boolean,
  errors: Map<TInputUserFormKeys, string>
) => {
  const inputs = isLogin ? loginInputs.slice(1) : loginInputs;
  return inputs.map((input) => {
    return { ...input, error: errors.get(input.name) };
  });
};

export const formDataToUserDTO = (form: HTMLFormElement): IUserDTO => {
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const imgData = formData.get("imgUrl") as File | null;

  const returnedData: IUserDTO = {};
  if (username) returnedData.username = username;
  if (email) returnedData.email = email;
  if (password) returnedData.password = password;
  if (imgData) returnedData.imgData = imgData;

  return returnedData;
};


