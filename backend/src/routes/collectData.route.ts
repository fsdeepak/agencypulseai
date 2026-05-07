import { Router } from "express";
import { collectData } from "../controllers/collectData.controller";
import { validate } from "../middleware/validate.middleware";
import { collectSchema } from "../schema/collectData.schema";

const sdkRoute = Router();

sdkRoute.post("/", validate(collectSchema), collectData);

export default sdkRoute;
