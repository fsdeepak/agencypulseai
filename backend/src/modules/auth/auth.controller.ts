import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth";
import { prisma } from "../../config/db.config";
import { Request, Response } from "express";

const mapAuthHeaders = (authResponse: Response, res: Response) => {
  authResponse.headers.forEach((value: string, key: string) => {
    if (key.toLowerCase() === "set-cookie") {
      res.append(key, value);
    } else {
      res.setHeader(key, value);
    }
  });
};

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isUserExists) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: name,
      },
    });

    await auth.api.sendVerificationEmail({
      body: {
        email: email,
        callbackURL: process.env.REDIRECT_LOGIN,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });
  } catch (error: any) {
    if (error.message?.includes("already exists") || error.status === 422) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const { token, callbackURL } = req.query; // Capture the callbackURL from the link

  if (!token || typeof token !== "string") {
    return res.status(400).json({ success: false, message: "Token missing" });
  }

  try {
    await auth.api.verifyEmail({
      query: {
        token: token,
      },
      headers: req.headers as any,
    });

    const redirectUrl = (callbackURL as string) || process.env.REDIRECT_LOGIN;
    return res.redirect(`${redirectUrl}?verified=true`);
  } catch (error: any) {
    if (error.name == "TokenExpiredError") {
      return res.status(410).json({
        success: false,
        message: "Link expired. Please request a new verification email.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "Invalid token signature.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const authResponse = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      asResponse: true,
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      return res.status(authResponse.status).json({
        success: false,
        message: errorData.message || "Registration failed",
        error: errorData,
      });
    }

    // 2. Map headers (for cookies/session)
    mapAuthHeaders(authResponse, res);

    const data = await authResponse.json();

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const authResponse = await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
      asResponse: true,
    });

    mapAuthHeaders(authResponse, res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const { id, email, name, role } = req.user;

    return res.status(200).json({
      success: true,
      user: {
        id,
        email,
        name,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export async function resendVerificationEmail(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    await auth.api.sendVerificationEmail({
      body: {
        email: email,
        callbackURL: process.env.REDIRECT_LOGIN,
      },
      headers: req.headers as any,
    });

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email: email,
        redirectTo: process.env.RESETPASSWORD,
      },
      headers: req.headers as any,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with that email, a reset link has been sent.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
}

export async function getResetToken(req: Request, res: Response) {
  const { token } = req.params;

  const frontendURl = `${process.env.RESETPASSWORD}?token=${token}`;
  return res.redirect(frontendURl);
}

export async function setPassword(req: Request, res: Response) {
  const { password, token } = req.body;

  if (!password || !token) {
    return res
      .status(400)
      .json({ success: false, message: "Token and password are required" });
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token: token,
      },
      headers: req.headers as any,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful", // Telling the frontend where to go
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to reset password",
    });
  }
}
