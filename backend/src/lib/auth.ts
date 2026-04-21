import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/db.config";
import { resend, sender } from "./resend";
// Removed unnecessary console import

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    strategy: "jwt",
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: false,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: sender,
        to: user.email,
        subject: "Welcome! Please verify your email",
        // Added name fallback for a professional touch
        html: `<p>Hello ${user.name || "User"},</p><p>Verify your account by clicking <a href="${url}">here</a>.</p>`,
      });
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
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

  trustedOrigins: ["http://localhost:3000"],
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: false,
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL, // Must include http://
  basePath: "/api/auth",
});
