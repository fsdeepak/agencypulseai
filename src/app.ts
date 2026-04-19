import cookieParser from "cookie-parser";
import express, { Application } from "express";
import authRoute from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

export default app;
