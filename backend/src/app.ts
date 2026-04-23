import cookieParser from "cookie-parser";
import express, { Application } from "express";
import authRoute from "./modules/auth/auth.route";
import cors from "cors";
import websiteRoute from "./modules/website/website.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

app.use("/api/website", websiteRoute);

export default app;
