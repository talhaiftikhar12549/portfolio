import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { getBlogsData } from "@/lib/blogs";

function isAdmin(request: NextRequest): boolean {
    const token = request.cookies.get("admin_token")?.value;
    return token ? verifyToken(token) : false;
}

export async function GET() {
    const blogs = await getBlogsData();
    if (blogs.length === 0 && !adminDb) {
        return NextResponse.json({ error: "Firebase not initialized" }, { status: 503 });
    }
    return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
    if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!adminDb) return NextResponse.json({ error: "Firebase not initialized" }, { status: 503 });

    try {
        const body = await request.json();
        const { title, slug, excerpt, coverImage, tags, content, faqs } = body;

        if (!title || !slug || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existing = await adminDb.collection("blogs").where("slug", "==", slug).get();
        if (!existing.empty) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });

        const now = new Date().toISOString();
        const docRef = await adminDb.collection("blogs").add({
            title, slug, excerpt: excerpt || "", coverImage: coverImage || "",
            tags: tags || [], content, faqs: faqs || [],
            published: true, publishedAt: now, updatedAt: now,
        });

        return NextResponse.json({ id: docRef.id, slug }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}