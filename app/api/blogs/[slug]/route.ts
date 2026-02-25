import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";

function isAdmin(request: NextRequest): boolean {
    const token = request.cookies.get("admin_token")?.value;
    return token ? verifyToken(token) : false;
}

async function getDocBySlug(slug: string) {
    const snapshot = await adminDb.collection("blogs").where("slug", "==", slug).limit(1).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0];
}

// GET /api/blogs/[slug] — public
export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const doc = await getDocBySlug(slug);
        if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ id: doc.id, ...doc.data() });
    } catch {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

// PATCH /api/blogs/[slug] — admin only
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    try {
        const doc = await getDocBySlug(slug);
        if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const body = await request.json();
        await doc.ref.update({ ...body, updatedAt: new Date().toISOString() });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

// DELETE /api/blogs/[slug] — admin only
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    try {
        const doc = await getDocBySlug(slug);
        if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

        await doc.ref.delete();
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
