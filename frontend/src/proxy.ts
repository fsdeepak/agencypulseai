import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Change this to 'export default'
export default function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 2. Keep your config as a named export
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*"],
};
