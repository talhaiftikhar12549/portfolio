import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

function isAdmin(request: NextRequest): boolean {
    const token = request.cookies.get("admin_token")?.value;
    return token ? verifyToken(token) : false;
}

// GET /api/blogs — public: fetch all published blogs
export async function GET() {
    try {
        const snapshot = await adminDb
            .collection("blogs")
            .where("published", "==", true)
            .orderBy("publishedAt", "desc")
            .get();

        const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST /api/blogs — admin only: create a blog
export async function POST(request: NextRequest) {
    if (!isAdmin(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, excerpt, coverImage, tags, content } = body;

        if (!title || !slug || !content) {
            return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
        }

        // Check slug uniqueness
        const existing = await adminDb.collection("blogs").where("slug", "==", slug).get();
        if (!existing.empty) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
        }

        const now = new Date().toISOString();
        const docRef = await adminDb.collection("blogs").add({
            title,
            slug,
            excerpt: excerpt || "",
            coverImage: coverImage || "",
            tags: tags || [],
            content,
            published: true,
            publishedAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ id: docRef.id, slug }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
