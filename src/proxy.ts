import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getClientIp(req: NextRequest): string {
    const cfIp = req.headers.get("cf-connecting-ip")?.trim();
    if (cfIp) return cfIp;

    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) {
        const firstIp = forwardedFor.split(",")[0]?.trim();
        if (firstIp) return firstIp;
    }

    const realIp = req.headers.get("x-real-ip")?.trim();
    if (realIp) return realIp;

    return "unknown";
}

export function proxy(req: NextRequest) {
    const session = req.cookies.get("access_token");
    const { pathname } = req.nextUrl;
    const ip = getClientIp(req);

    console.log(`🔥 Middleware: ${pathname} | Session: ${session ? "Active" : "None"} | IP: ${ip}`);

    // Define auth routes that should be inaccessible when logged in
    const isAuthRoute =
        pathname.startsWith("/masuk") ||
        pathname.startsWith("/daftar") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/buatakun") ||
        pathname.startsWith("/signin");

    // Redirect authenticated users away from auth pages to home
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};