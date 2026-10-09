import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { cookiesHelper } from "@/lib/helper/cookies";

export async function POST() {
    try {
        // 2️⃣ Forward cookies to gateway
        const res = await serverApi.post<any>("/users/logout", {});

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
