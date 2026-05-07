import { Request, Response } from "express";
import { prisma } from "../config/db.config";

export async function getLogs(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [logs, totalCount] = await Promise.all([
      prisma.log.findMany({
        where: { websiteId: id },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.log.count({ where: { websiteId: id } }),
    ]);

    if (!logs || logs.length < 0) {
      return res.status(404).json({
        success: false,
        message: "Logs not found.",
      });
    }
    const hasNextPage = skip + logs.length < totalCount;

    return res.status(200).json({
      success: true,
      logs,
      nextPage: hasNextPage ? page + 1 : undefined,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
}

export async function getAlerts(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [alerts, totalCount] = await Promise.all([
      prisma.alert.findMany({
        where: { websiteId: id },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.alert.count({ where: { websiteId: id } }),
    ]);

    if (!alerts || alerts.length < 0) {
      return res.status(404).json({
        success: false,
        message: "Logs not found.",
      });
    }
    const hasNextPage = skip + alerts.length < totalCount;

    return res.status(200).json({
      success: true,
      alerts,
      nextPage: hasNextPage ? page + 1 : undefined,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
}
