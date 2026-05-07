import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import authRoute from "./routes/auth.route";
import cors from "cors";
import websiteRoute from "./routes/website.route";
import sdkRoute from "./routes/collectData.route";
import "./lib/aiJob";
import logAlertRoute from "./routes/logAlert.route";
import healthRoute from "./routes/health.route";
import helmet from "helmet";

const app: Application = express();

const collectorCors = cors({
  origin: true,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", healthRoute);

app.use("/api/auth", authRoute);

app.use("/api/website", websiteRoute);

app.use("/api/collect", collectorCors, sdkRoute);

app.use("/api/", logAlertRoute);

export default app;
