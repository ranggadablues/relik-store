import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";

export async function GET() {
    const data = await serverApi.get("/products");
    return Response.json(data);
}

// POST /api/product
export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ created: true, body });
}

// PUT /api/product
export async function PUT(req: Request) {
    const body = await req.json();
    return NextResponse.json({ updated: true, body });
}

// DELETE /api/product
export async function DELETE(req: Request) {
    return NextResponse.json({ deleted: true });
}