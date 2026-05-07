// types/auth.d.ts
import { Session, User } from "better-auth";

declare global {
  namespace Express {
    interface AuthUser {
      id: string; // The missing piece!
      email: string;
      name: string;
      role: string; // Your custom field
      emailVerified: boolean;
      image?: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
    interface Request {
      user: AuthUser;
      session: Session;
    }
  }
}

export {};
