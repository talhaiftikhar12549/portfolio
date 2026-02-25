import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (!verifyAdminPassword(password)) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = signToken();
        const response = NextResponse.json({ success: true });

        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
