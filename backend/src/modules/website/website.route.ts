import { Router } from "express";
import { authMiddleware } from "../../globalMiddleware/auth.middlware";
import {
  createWebsite,
  deleteWebsite,
  getWebsites,
  updateWebsite,
} from "./website.controller";
import { validate } from "../../globalMiddleware/validate.middleware";
import { createWebsiteSchema, updateWebsiteSchema } from "./website.schema";

const websiteRoute = Router();

websiteRoute.post(
  "/add",
  authMiddleware,
  validate(createWebsiteSchema),
  createWebsite,
);

websiteRoute.get("/", authMiddleware, getWebsites);

websiteRoute.patch(
  "/:id",
  authMiddleware,
  validate(updateWebsiteSchema),
  updateWebsite,
);

websiteRoute.delete("/:id", authMiddleware, deleteWebsite);
export default websiteRoute;
