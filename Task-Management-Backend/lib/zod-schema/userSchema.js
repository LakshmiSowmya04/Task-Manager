import { z } from "zod";

const registerUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(40, { message: "Email must not exceed 40 characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(20, { message: "Username must not exceed 20 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must not exceed 25 characters" }),
});

const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(40, { message: "Email must not exceed 40 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must not exceed 25 characters" }),
});

export { loginUserSchema, registerUserSchema };
