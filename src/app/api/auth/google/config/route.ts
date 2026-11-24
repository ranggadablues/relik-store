import { NextResponse } from "next/server";
import { getRuntimeEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const clientId = getRuntimeEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID");

    return NextResponse.json(
        { clientId },
        {
            headers: {
                "Cache-Control": "no-store",
            },
        },
    );
}
