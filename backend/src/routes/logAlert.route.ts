import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middlware";
import { getAlerts, getLogs } from "../controllers/logAlert.controller";

const logAlertRoute = Router();

logAlertRoute.get("/logs/:id", authMiddleware, getLogs);

logAlertRoute.get("/alerts/:id", authMiddleware, getAlerts);

export default logAlertRoute;
