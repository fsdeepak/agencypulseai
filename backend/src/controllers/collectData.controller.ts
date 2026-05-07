import { Request, Response } from "express";
import { prisma } from "../config/db.config";

export async function collectData(req: Request, res: Response) {
  try {
    const { apiKey, events } = req.body;

    const website = await prisma.website.findUnique({
      where: {
        apiKey: apiKey,
      },
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Invalid API key",
      });
    }

    await prisma.log.createMany({
      data: events.map((event: any) => ({
        websiteId: website.id,
        type: event.type,
        status: event.status,
        method: event.method,
        url: event.url,
        responseTime: event.responseTime,
        message: event.message ?? null,
        stack: event.stack ?? null,
      })),
    });

    const alerts = events.filter((e: any) => {
      return e.status >= 400 || e.responseTime > 1000;
    });

    function getSeverity(e: any) {
      if (e.status >= 500 || e.responseTime > 2000) {
        return "HIGH";
      }

      if (
        (e.status >= 400 && e.status < 500) ||
        (e.responseTime > 1000 && e.responseTime <= 2000)
      ) {
        return "MEDIUM";
      }

      return "LOW";
    }

    if (alerts.length > 0) {
      await prisma.alert.createMany({
        data: alerts.map((e: any) => ({
          websiteId: website.id,
          type: "ERROR",
          message: e.message || "Request failed",
          url: e.url,
          method: e.method,
          status: e.status,
          severity: getSeverity(e),
        })),
      });
    }
    return res.status(201).json({
      success: true,
      message: "Data ingested successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
