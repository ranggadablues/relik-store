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
            { status: 400 },
        );
    }

    // 2️⃣ Forward to your backend – guard against network / business errors
    let backendResponse: any;
    try {
        if (access_token && user_info) {
            backendResponse = await serverApi.post<any>("/users/googleauth", {
                access_token,
                user_info,
            });
        } else {
            backendResponse = await serverApi.post<any>("/users/googleauth", {
                id_token,
            });
        }
    } catch (err) {
        console.error("Google auth backend request failed", err);
        const message = err instanceof Error ? err.message : "Google authentication failed";
        return NextResponse.json({ message }, { status: 500 });
    }

    // The gateway wraps responses as:
    //   { success: true, data: { accessToken, refreshToken, user? }, code: 200, meta: {...} }
    // serverApi.post already parses the JSON, so backendResponse IS that wrapper object.
    // Check if the gateway reported a failure
    if (backendResponse?.success === false) {
        console.error("Gateway reported failure:", backendResponse.message);
        return NextResponse.json(
            { message: backendResponse.message || "Authentication failed" },
            { status: 500 },
        );
    }

    // Extract tokens from the wrapper: backendResponse.data holds { accessToken, refreshToken }
    const data = backendResponse?.data;
    const accessToken = data?.accessToken;
    const refreshToken = data?.refreshToken;

    if (!accessToken || !refreshToken) {
        console.warn("Missing tokens in gateway response.");
        return NextResponse.json(
            { message: "Invalid response from authentication server" },
            { status: 502 },
        );
    }

    await cookiesHelper.setCookie("access_token", accessToken);
    await cookiesHelper.setCookie("refresh_token", refreshToken);

    // 3️⃣ Fetch user profile using the new token – tolerate failures gracefully
    let user = data?.user ?? null;
    if (!user) {
        try {
            const meResponse = await serverApi.get<any>("/users/me", {
                headers: {
                    Cookie: `access_token=${accessToken}`,
                },
            });
            user = meResponse?.data ?? meResponse;
        } catch (e) {
            console.warn("Could not fetch user profile after Google login:", e);
        }
    }

    // 4️⃣ Return user so the client can hydrate authStore
    return NextResponse.json({ success: true, user });
}
