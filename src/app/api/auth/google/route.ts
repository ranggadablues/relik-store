import { NextResponse } from "next/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import { serverApi } from "@/lib/api/server";

export async function POST(req: Request) {
    // 1️⃣ Parse JSON body
    const body = await req.json();
    const { id_token, access_token, user_info } = body;

    // Support both old (id_token) and new (access_token + user_info) flows
    if (!id_token && !access_token) {
        return NextResponse.json(
            { message: "id_token or access_token is required" },
            { status: 400 }
        );
    }

    // 2️⃣ Forward to your backend
    let response;

    if (access_token && user_info) {
        response = await serverApi.post<any>("/users/googleauth", {
            access_token,
            user_info,
        });
    } else {
        response = await serverApi.post<any>("/users/googleauth", {
            id_token,
        });
    }

    const { accessToken, refreshToken } = response.data;
    await cookiesHelper.setCookie("access_token", accessToken);
    await cookiesHelper.setCookie("refresh_token", refreshToken);

    // 3️⃣ Fetch user profile using the new token
    let user = null;
    try {
        const meResponse = await serverApi.get<any>("/users/me", {
            headers: {
                Cookie: `access_token=${accessToken}`,
            },
        });
        user = meResponse.data ?? meResponse;
    } catch (e) {
        console.warn("Could not fetch user profile after Google login:", e);
    }

    // 4️⃣ Return user so the client can hydrate authStore
    return NextResponse.json({ success: true, user });
}
