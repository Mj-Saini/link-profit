export function middleware(req) {
  const nextUrl = req.nextUrl.clone();

  // server side cookie
  const isRegistered = req.cookies.get("registered")?.value;

  if (!isRegistered && nextUrl.pathname !== "/registration") {
    return NextResponse.redirect(new URL("/registration", req.url));
  }

  if (isRegistered && nextUrl.pathname === "/registration") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
