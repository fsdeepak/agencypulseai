import cookieParser from "cookie-parser";
import express, { Application } from "express";
import authRoute from "./modules/auth/auth.route";
import cors from "cors";
import websiteRoute from "./modules/website/website.route";
import sdkRoute from "./modules/collectData/collectData.route";
import "./modules/collectData/aiJob";
import logAlertRoute from "./modules/logAlert/logAlert.route";

const app: Application = express();

const mainCors = cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

const collectorCors = cors({
  origin: true,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", mainCors, authRoute);

app.use("/api/website", mainCors, websiteRoute);

app.use("/api/collect", collectorCors, sdkRoute);

app.use("/api/", mainCors, logAlertRoute);

export default app;
