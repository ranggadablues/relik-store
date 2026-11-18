import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore
            .getAll()
            .map(c => `${c.name}=${c.value}`)
            .join("; ");

        // 2️⃣ Forward cookies to gateway
        const res = await serverApi.post<any>("/users/logout", {}, {
            headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
        });

        return NextResponse.json(res);

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Error" },
            { status: 500 }
        );
    } finally {
        // 3️⃣ Always clear cookies locally
        await cookiesHelper.deleteCookie("access_token");
        await cookiesHelper.deleteCookie("refresh_token");
    }
}
