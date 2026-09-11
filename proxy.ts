import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function withLocaleHeaders(request: NextRequest, pathname: string, locale: "en" | "fr") {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname", pathname);
  return headers;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/portal" || pathname === "/portal/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en/portal";
    return NextResponse.rewrite(url, {
      request: { headers: withLocaleHeaders(request, "/portal", "en") },
    });
  }

  if (pathname.startsWith("/portal/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname.replace(/\/$/, "")}`;
    return NextResponse.rewrite(url, {
      request: { headers: withLocaleHeaders(request, "/portal", "en") },
    });
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(new URL(stripped, request.url));
  }

  const locale = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  const headers = withLocaleHeaders(request, pathname, locale);

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.rewrite(url, { request: { headers } });
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/portal",
    "/portal/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)",
  ],
};
