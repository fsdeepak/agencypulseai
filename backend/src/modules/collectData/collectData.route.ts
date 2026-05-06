import { Router } from "express";
import { collectData } from "./collectData.controller";
import { validate } from "../../globalMiddleware/validate.middleware";
import { collectSchema } from "./collectData.schema";

const sdkRoute = Router();

sdkRoute.post("/", validate(collectSchema), collectData);

export default sdkRoute;
