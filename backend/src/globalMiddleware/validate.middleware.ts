import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodType<any, any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // We parse the body and overwrite req.body with the validated version
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        });
      }
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
