import { NextResponse } from "next/server";
import { cookiesHelper } from "@/lib/helper/cookies";
import crypto from "crypto";

export const runtime = "nodejs"; // important in Next.js 16

export async function GET() {
    const state = crypto.randomBytes(16).toString("hex");
    await cookiesHelper.setCookie("fb_oauth_state", state, { maxAge: 300 });

    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI!,
        scope: "email,public_profile",
        response_type: "code",
        state,
    });

    return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FACEBOOK_URI}/${process.env.NEXT_PUBLIC_FACEBOOK_DIALOG_OAUTH_VERSION}/dialog/oauth?${params}`
    );
}
