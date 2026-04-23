import { Router } from "express";
import { authMiddleware } from "../../globalMiddleware/auth.middlware";
import { createWebsite } from "./website.controller";
import { validate } from "../../globalMiddleware/validate.middleware";
import { createWebsiteSchema } from "./website.schema";

const websiteRoute = Router();

websiteRoute.post(
  "/",
  authMiddleware,
  validate(createWebsiteSchema),
  createWebsite,
);

export default websiteRoute;
