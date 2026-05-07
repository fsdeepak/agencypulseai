import { Request, Response } from "express";
import { prisma } from "../config/db.config";
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

    const website = await prisma.website.create({
      data: {
        name: name,
        url: url,
        apiKey: apiKey,
        userId: userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Website added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

export async function getWebsites(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const websites = await prisma.website.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        url: true,
        apiKey: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "All websites feteched successfully",
      websites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

export async function updateWebsite(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    const { id } = req.params;

    const { name, url } = req.body;

    const isValidWebsite = await prisma.website.findFirst({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (!isValidWebsite) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    const website = await prisma.website.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        url: url,
      },
    });

    return res.status(200).json({
      success: true,
      messsage: "Website update successfully.",
      website,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

export async function deleteWebsite(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const isValidWebsite = await prisma.website.findFirst({
      where: { id: id },
    });

    if (!isValidWebsite) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    const website = await prisma.website.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Website deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
