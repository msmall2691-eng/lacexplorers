import { NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing for the parent portal.
 *
 * When a portal subdomain (portal.<domain> by default — override with the
 * PORTAL_SUBDOMAINS env var, comma-separated) points at this deployment,
 * requests to it are served from /portal, so parents can just visit
 * https://portal.lacexplorers.online and land on the sign-in screen.
 */

const SUBDOMAINS = (process.env.PORTAL_SUBDOMAINS || "portal,families,app")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  const firstLabel = host.split(".")[0];
  if (!SUBDOMAINS.includes(firstLabel)) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/portal")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/portal" : `/portal${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next.js internals and static assets.
  matcher: ["/((?!_next/|api/|favicon.ico|icon.svg|images/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)$).*)"],
};
