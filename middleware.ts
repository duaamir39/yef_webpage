// middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/donate/:path*",
    "/programs/apply/:path*",
    "/get-involved/volunteer/:path*", 
    "/get-involved/membership/:path*",
    "/dashboard/:path*"
  ]
};