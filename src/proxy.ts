import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const session = req.cookies.get("access_token");
    const { pathname } = req.nextUrl;

    console.log(`🔥 Middleware: ${pathname} | Session: ${session ? "Active" : "None"}`);

    // Define auth routes that should be inaccessible when logged in
    const isAuthRoute = pathname.startsWith("/signin");

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