import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(3, "Name is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const setPasswordSchema = z.object({
  token: z.string().min(6),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
