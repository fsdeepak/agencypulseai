import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/db.config";
import { resend, sender } from "./resend";

interface AuthCallbackUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role?: string; // This matches your additionalFields
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  emailVerification: {
    sendOnSignUp: false,
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: AuthCallbackUser;
      url: string;
    }) => {
      await resend.emails.send({
        from: sender,
        to: user.email,
        subject: "Welcome! Please verify your email",
        html: `<p>Hello ${user.name || "User"},</p><p>Verify your account by clicking <a href="${url}">here</a>.</p>`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: AuthCallbackUser;
      url: string;
    }) => {
      await resend.emails.send({
        from: sender,
        to: user.email,
        subject: "Reset your password",
        html: `<p>Hi ${user.name || "there"},</p><p>Click <a href="${url}">here</a> to reset your password.</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },

  trustedOrigins: [process.env.BETTER_AUTH_TRUSTED!],

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  basePath: "/api/auth",
});
