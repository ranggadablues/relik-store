import { serverApi } from "@/lib/api/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token") || searchParams.get("id");

        if (!token) {
            return NextResponse.json(
                { success: false, data: { success: false }, message: "Token is required" },
                { status: 400 }
            );
        }

        const encodedToken = encodeURIComponent(token);

        // Verify activation token via gateway -> user-service (/users/useractivation/{token})
        const response = await serverApi.get<any>(`/users/useractivation/${encodedToken}`);

        // Fallback to /users/createaccount/{token} if the token was encrypted with the createaccount key
        if (response && response.success === false && response.code === 400) {
            try {
                const fallbackResponse = await serverApi.get<any>(`/users/createaccount/${encodedToken}`);
                if (fallbackResponse && fallbackResponse.success) {
                    return NextResponse.json(fallbackResponse);
                }
            } catch {
                // Ignore fallback error and return primary response
            }
        }

        return NextResponse.json(response);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            success: false,
            data: { success: false },
            error: error?.message || "Failed to verify activation token",
        });
    }
}
