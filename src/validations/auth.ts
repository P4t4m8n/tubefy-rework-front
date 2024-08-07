import { z } from "zod";

const signupFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

export const userFormValidation = {
  loginFormSchema,
  signupFormSchema,
};
