import { Router } from "express";
import {
  getMe,
  getResetToken,
  login,
  logout,
  register,
  resendVerificationEmail,
  resetPassword,
  setPassword,
  verifyEmail,
} from "./auth.controller";
import { authMiddleware } from "../../globalMiddleware/auth.middlware";
import { validate } from "../../globalMiddleware/validate.middleware";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from "./auth.schema";

const authRoute = Router();

authRoute.post("/register", validate(registerSchema), register);

authRoute.get("/verify-email", verifyEmail);

authRoute.post("/login", validate(loginSchema), login);

authRoute.post("/resend-verifcation-email", resendVerificationEmail);

authRoute.post("/logout", logout);

authRoute.get("/me", authMiddleware, getMe);

authRoute.post(
  "/request-password-reset",
  validate(resetPasswordSchema),
  resetPassword,
);

authRoute.get("/reset-password/:token", getResetToken);

authRoute.post("/reset-password", validate(setPasswordSchema), setPassword);

export default authRoute;
