import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middlware";
import {
  createWebsite,
  deleteWebsite,
  getWebsites,
  updateWebsite,
} from "../controllers/website.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createWebsiteSchema,
  updateWebsiteSchema,
} from "../schema/website.schema";

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
