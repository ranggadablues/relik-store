import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // 1️⃣ Read cookies from incoming request
        const cookieStore = await cookies();
        const cookieHeader = cookieStore
            .getAll()
            .map(c => `${c.name}=${c.value}`)
            .join("; ");

        if (!cookieHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // 2️⃣ Forward cookies to gateway
        const data = await serverApi.get("/users/me", {
            headers: {
                Cookie: cookieHeader,
            },
        });

        return NextResponse.json(data);

    } catch (error: any) {
        if (error.message?.includes("401")) {
            return NextResponse.json({ message: "Session expired" }, { status: 401 });
        }

        return NextResponse.json(
            { message: error.message || "Internal Error" },
            { status: 500 }
        );
    }
}
