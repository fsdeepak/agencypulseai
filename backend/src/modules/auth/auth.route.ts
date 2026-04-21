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
import { authMiddleware } from "./auth.middleware";

const authRoute = Router();

authRoute.post("/register", register);

authRoute.get("/verify-email", verifyEmail);

authRoute.post("/login", login);

authRoute.post("/resend-verifcation-email", resendVerificationEmail);

authRoute.post("/logout", logout);

authRoute.get("/me", authMiddleware, getMe);

authRoute.post("/request-password-reset", resetPassword);

authRoute.get("/reset-password/:token", getResetToken);

authRoute.post("/reset-password", setPassword);

export default authRoute;
