import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth";
import { z } from "zod";

const mapAuthHeaders = (authResponse: Response, res: Response) => {
  authResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.append(key, value);
    } else {
      res.setHeader(key, value);
    }
  });
};

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password  must be at least 8 characters"),
  name: z.string().min(3, "Name is required"),
});
export async function register(req: Request, res: Response) {
  try {
    const validatedData = registerSchema.parse(req.body);

    const authResponse = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
      asResponse: true, // This returns a Fetch Response object
    });

    // 1. CHECK IF THE AUTH ACTION ACTUALLY SUCCEEDED
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

    // 3. Parse the actual user data to return it
    const data = await authResponse.json();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const authResponse = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

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
