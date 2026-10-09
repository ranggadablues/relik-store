import { serverApi } from "@/lib/api/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, confirmPassword, dob, agreeToTerms, subscribeNewsletter } = body;

        const params = {
            "user": {
                "email": email,
            },
            "userdetails": {
                "password": password,
                "confirmpassword": confirmPassword,
                "name": name,
                "dob": dob,
                "termofserviceandprivacypolicy": agreeToTerms,
                "subscribenewsletter": subscribeNewsletter
            }
        }
        const response = await serverApi.post<any>("/users/register", params);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || "Internal Server Error"
            },
            {
                status: error.response?.status || 500
            }
        );
    }
}