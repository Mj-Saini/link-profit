// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const isRegistered = req.cookies.get("registered")?.value;

  // ✅ Static files ko allow karo
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg)$/)
  ) {
    return NextResponse.next();
  }

  // 🚫 User not registered → force to /registration
  if (!isRegistered && pathname !== "/registration") {
    return NextResponse.redirect(new URL("/registration", req.url));
  }

  // ✅ Already registered but trying to access /registration → home bhej do
  if (isRegistered && pathname === "/registration") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply to all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
