import { Router, Request, Response } from "express";

const healthRoute = Router();

healthRoute.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "available",
    system: "AgencyPulse AI Backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default healthRoute;
