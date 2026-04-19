import { Router } from "express";
import { login, logout, register } from "./auth.controller";

const authRoute = Router();

authRoute.post("/register", register);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

export default authRoute;
