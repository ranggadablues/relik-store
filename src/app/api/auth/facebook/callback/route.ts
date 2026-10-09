import { serverApi } from "@/lib/api/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // optional if you want relative redirects

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: "Missing code" }, { status: 400 });
        }

        // Send code to backend
        const response = await serverApi.post<any>("/users/facebookauth", {
            code,
        });

        // Save token (e.g., cookie/localStorage)
        const { accessToken, refreshToken } = response.data;
        await cookiesHelper.setCookie("access_token", accessToken)
        await cookiesHelper.setCookie("refresh_token", refreshToken)

        // Send data back to opener window & close popup
        return new NextResponse(`
            <script>
                window.opener.postMessage({
                source: "facebook-auth",
                user: ${JSON.stringify(response.data)},
                }, window.location.origin);
                window.close();
            </script>
        `, {
            headers: { "Content-Type": "text/html" }
        });
    } catch (err: any) {
        console.error("Callback error:", err?.response?.data || err?.message || err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}