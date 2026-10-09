import { serverApi } from "@/lib/api/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        // Captured the id here
        const id = searchParams.get("token");
        // If your backend server expects `id` instead of `token`, update the payload accordingly
        const response = await serverApi.get<any>(`/users/createaccount/${id}`); // Or however your Go backend expects it
        return NextResponse.json(response);
    } catch (error: any) {
        // ... error handling
        console.error(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}