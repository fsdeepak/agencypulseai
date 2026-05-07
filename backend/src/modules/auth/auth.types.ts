// types/auth.d.ts
import { Session, User } from "better-auth";

declare global {
  namespace Express {
    interface AuthUser extends User {
      role: string;
    }
    interface Request {
      user: User;
      session: Session;
    }
  }
}

export {};
