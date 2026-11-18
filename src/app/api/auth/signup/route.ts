import { serverApi } from "@/lib/api/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            password,
            confirmPassword,
            dob,
            agreeToTerms,
            subscribeNewsletter,
            phone,
            address,
            city,
            province,
            postalCode,
        } = body;

        const params = {
            user: {
                email,
            },
            userdetails: {
                password,
                confirmpassword: confirmPassword,
                name,
                dob,
                termofserviceandprivacypolicy: agreeToTerms,
                subscribenewsletter: subscribeNewsletter ?? false,
                ...(phone && { phone }),
                ...(address && { address }),
                ...(city && { city }),
                ...(province && { state: province }),
                ...(postalCode && { zipcode: postalCode }),
                country: "Indonesia",
            },
        };
        const response = await serverApi.post<any>("/users/register", params);
        return NextResponse.json(response);
    } catch (error: unknown) {
        let message = "Internal Server Error";
        let status = 500;

        if (error instanceof Error) {
            const match = error.message.match(/^API (\d+):\s*([\s\S]*)$/);
            if (match) {
                status = Number(match[1]) || 500;
                try {
                    const parsed = JSON.parse(match[2]) as { message?: string };
                    if (parsed.message) message = parsed.message;
                } catch {
                    if (match[2].trim()) message = match[2].trim();
                }
            } else {
                message = error.message;
            }
        }

        return NextResponse.json({ success: false, message }, { status });
    }
}