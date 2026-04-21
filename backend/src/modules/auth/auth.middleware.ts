import { fromNodeHeaders } from "better-auth/node";
import { NextFunction } from "express";
import { auth } from "../../lib/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  (req as any).user = session.user;
  (req as any).session = session.session;
  next();
};
