import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// First line of route protection. Pages re-check with lib/auth.ts.
//  - /ps, /panel   → signed out: redirect to /login?next=…
//  - /panel        → signed in but not admin: redirect to /ps?denied=panel
//  - /login, /register → already signed in: redirect to /ps
export async function middleware(req: NextRequest) {
  const { pathname, search, searchParams } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    if (searchParams.get("logout") === "1") {
      const res = NextResponse.next();
      if (token) res.cookies.delete(SESSION_COOKIE);
      return res;
    }
    if (session) return NextResponse.redirect(new URL("/ps", req.url));
    return NextResponse.next();
  }

  if (!session) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname + search);
    const res = NextResponse.redirect(url);
    if (token) res.cookies.delete(SESSION_COOKIE); // drop invalid/expired cookie
    return res;
  }

  if (pathname.startsWith("/panel") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/ps?denied=panel", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ps/:path*", "/panel/:path*", "/login", "/register"],
};
