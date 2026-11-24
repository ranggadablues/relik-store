import { NextResponse } from "next/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import { getRuntimeEnv } from "@/lib/env";
import crypto from "crypto";

export const runtime = "nodejs"; // important in Next.js 16
export const dynamic = "force-dynamic";

export async function GET() {
    const state = crypto.randomBytes(16).toString("hex");
    await cookiesHelper.setCookie("fb_oauth_state", state, { maxAge: 300 });

    const clientId = getRuntimeEnv("NEXT_PUBLIC_FACEBOOK_APP_ID", "FACEBOOK_APP_ID");
    const redirectUri = getRuntimeEnv("NEXT_PUBLIC_FACEBOOK_REDIRECT_URI", "FACEBOOK_REDIRECT_URI");
    const facebookUri = getRuntimeEnv("NEXT_PUBLIC_FACEBOOK_URI", "FACEBOOK_URI") || "https://www.facebook.com";
    const oauthVersion = getRuntimeEnv("NEXT_PUBLIC_FACEBOOK_DIALOG_OAUTH_VERSION", "FACEBOOK_DIALOG_OAUTH_VERSION") || "v19.0";

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "email,public_profile",
        response_type: "code",
        state,
    });

    return NextResponse.redirect(
        `${facebookUri}/${oauthVersion}/dialog/oauth?${params}`
    );
}
