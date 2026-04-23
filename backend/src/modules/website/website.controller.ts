import { Request, Response } from "express";
import { prisma } from "../../config/db.config";
import crypto from "crypto";

export async function createWebsite(req: Request, res: Response) {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        success: false,
        message: "Name and URL are required.",
      });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const isUrlExists = await prisma.website.findUnique({
      where: {
        url: url,
      },
    });

    if (isUrlExists) {
      return res.status(409).json({
        success: false,
        message: "Website already exists.",
      });
    }

    const apiKey = crypto.randomBytes(32).toString("hex").slice(0, 24);

    const hashedApiKey = crypto
      .createHash("sha256")
      .update(apiKey)
      .digest("hex");

    const website = await prisma.website.create({
      data: {
        name: name,
        url: url,
        apiKey: hashedApiKey,
        userId: userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Website added successfully",
      apiKey: apiKey,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
