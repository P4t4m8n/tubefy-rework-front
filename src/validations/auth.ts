import { TInputUserFormKeys } from "../models/app.model";
import { IUserDTO } from "../models/user.model";

type TErrorMap = Map<TInputUserFormKeys, string>;

export const validateSignup = (data: IUserDTO) => {
  const errors: TErrorMap = new Map<TInputUserFormKeys, string>();

  validateEmailField(errors, data.email);
  validatePasswordField(errors, data.password);
  validateUsernameField(errors, data.username);

  return errors;
};

export const validateLogin = (data: IUserDTO) => {
  const errors: Map<TInputUserFormKeys, string> = new Map<
    TInputUserFormKeys,
    string
  >();

  validateEmailField(errors, data.email);
  validatePasswordField(errors, data.password);

  return errors;
};

const validateEmailField = (errors: TErrorMap, email?: string) => {
  if (!email) {
    errors.set("email", errorMap.email.required);
  } else if (!validateEmail(email)) {
    errors.set("email", errorMap.email.invalid);
  }
};

const validateUsernameField = (errors: TErrorMap, username?: string) => {
  if (!username) {
    errors.set("username", errorMap.username.required);
  } else if (!validateUsername(username)) {
    errors.set("username", errorMap.username.invalid);
  } else if (username.length < 3 || username.length > 20) {
    errors.set("username", errorMap.username.exceeded);
  }
};

const validatePasswordField = (errors: TErrorMap, password?: string) => {
  if (!password) {
    errors.set("password", errorMap.password.required);
  } else if (!validatePassword(password)) {
    errors.set("password", errorMap.password.invalid);
  } else if (password.length < 6 || password.length > 20) {
    errors.set("password", errorMap.password.exceeded);
  }
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return passwordRegex.test(password);
};

const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
};

const errorMap = {
  email: {
    required: "Email is required",
    invalid: "Email is invalid",
  },
  username: {
    required: "Username is required",
    invalid: "Username can only include letters and numbers",
    exceeded: "User name needs to be between 3-20 characters",
  },
  password: {
    required: "Password is required",
    invalid: "must include an uppercase, a lowercase letter, and a number.",
    exceeded: "Password needs to be between 6-20 characters",
  },
};
