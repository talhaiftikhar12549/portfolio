import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";

function isAdmin(request: NextRequest): boolean {
    const token = request.cookies.get("admin_token")?.value;
    return token ? verifyToken(token) : false;
}

// GET /api/admin/blogs — admin only: fetch ALL blogs (published + drafts)
export async function GET(request: NextRequest) {
    if (!isAdmin(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminDb) {
        return NextResponse.json({ error: "Firebase not initialized" }, { status: 503 });
    }

    try {
        const snapshot = await adminDb
            .collection("blogs")
            .orderBy("publishedAt", "desc")
            .get();

        const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(blogs);
    } catch (error: any) {
        console.error("Error fetching blogs for admin - code:", error?.code);
        console.error("Error fetching blogs for admin - message:", error?.message);
        console.error("Error fetching blogs for admin - details:", error?.details);
        console.error("Error fetching blogs for admin - stack:", error?.stack);
        return NextResponse.json({ error: "Failed to fetch blogs", details: error?.message }, { status: 500 });
    }
}

