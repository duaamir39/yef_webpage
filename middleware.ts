import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Check if user has a valid session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login page and include redirect param
  if (!token) {
    const loginUrl = new URL("/auth/signin", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is logged in, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/donate/:path*",
    "/programs/apply/:path*",
    "/get-involved/volunteer/:path*",
    "/get-involved/membership/:path*",
    "/dashboard/:path*",
  ],
};
