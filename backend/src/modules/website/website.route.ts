import { Router } from "express";
import { authMiddleware } from "../../globalMiddleware/auth.middlware";
import { createWebsite, getWebsites } from "./website.controller";
import { validate } from "../../globalMiddleware/validate.middleware";
import { createWebsiteSchema } from "./website.schema";

const websiteRoute = Router();

websiteRoute.post(
  "/add",
  authMiddleware,
  validate(createWebsiteSchema),
  createWebsite,
);

websiteRoute.get("/", authMiddleware, getWebsites);

export default websiteRoute;
