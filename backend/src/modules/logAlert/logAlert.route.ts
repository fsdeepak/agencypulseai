import { Router } from "express";
import { authMiddleware } from "../../globalMiddleware/auth.middlware";
import { getAlerts, getLogs } from "./logAlert.controller";

const logAlertRoute = Router();

logAlertRoute.get("/logs/:id", authMiddleware, getLogs);

logAlertRoute.get("/alerts/:id", authMiddleware, getAlerts);

export default logAlertRoute;
