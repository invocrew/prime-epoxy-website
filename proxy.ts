import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(new URL(stripped, request.url));
  }

  const locale = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  headers.set("x-locale", locale);

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.rewrite(url, { request: { headers } });
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)"],
};
