import { serverApi } from "@/lib/api/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const savedState = await cookiesHelper.getCookie("fb_oauth_state");

        // Clean state cookie
        await cookiesHelper.deleteCookie("fb_oauth_state");

        if (!savedState || !state || state !== savedState) {
            return new NextResponse(`
                <script>
                    alert("Facebook authentication failed: Invalid OAuth state.");
                    window.close();
                </script>
            `, {
                headers: { "Content-Type": "text/html" },
                status: 400,
            });
        }

        if (!code) {
            return NextResponse.json({ error: "Missing code" }, { status: 400 });
        }

        // Send code to backend
        const response = await serverApi.post<any>("/users/facebookauth", {
            code,
        });

        // Save tokens to httpOnly cookies
        const { accessToken, refreshToken } = response.data;
        await cookiesHelper.setCookie("access_token", accessToken);
        await cookiesHelper.setCookie("refresh_token", refreshToken);

        // Fetch user profile using the new token
        let user = null;
        try {
            const meResponse = await serverApi.get<any>("/users/me", {
                headers: {
                    Cookie: `access_token=${accessToken}`,
                },
            });
            user = meResponse.data ?? meResponse;
        } catch (e) {
            console.warn("Could not fetch user profile after Facebook login:", e);
        }

        // Send user back to opener window & close popup
        return new NextResponse(`
            <script>
                window.opener.postMessage({
                    source: "facebook-auth",
                    user: ${JSON.stringify(user)},
                }, window.location.origin);
                window.close();
            </script>
        `, {
            headers: { "Content-Type": "text/html" }
        });
    } catch (err: any) {
        const errorMsg = err?.response?.data?.message || err?.message || "Unknown error";
        console.error("Facebook Callback error:", errorMsg);
        return new NextResponse(`
            <script>
                if (window.opener) {
                    window.opener.postMessage({
                        source: "facebook-auth",
                        error: ${JSON.stringify(errorMsg)},
                    }, window.location.origin);
                } else {
                    alert("Facebook login failed: " + ${JSON.stringify(errorMsg)});
                }
                window.close();
            </script>
        `, {
            headers: { "Content-Type": "text/html" },
            status: 500,
        });
    }
}