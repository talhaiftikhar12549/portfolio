import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";

function isAdmin(request: NextRequest): boolean {
    const token = request.cookies.get("admin_token")?.value;
    return token ? verifyToken(token) : false;
}

export async function POST(request: NextRequest) {
    if (!isAdmin(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminStorage) {
        return NextResponse.json({ error: "Firebase Storage not initialized" }, { status: 503 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const bucket = adminStorage.bucket();
        const fileRef = bucket.file(`blog-covers/${filename}`);

        // Generate a random token for Firebase Storage download
        const downloadToken = crypto.randomUUID();

        await fileRef.save(buffer, {
            metadata: {
                contentType: file.type,
                metadata: {
                    firebaseStorageDownloadTokens: downloadToken,
                },
            },
        });

        // Construct the Firebase public URL using the token
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileRef.name)}?alt=media&token=${downloadToken}`;

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Failed to upload image", details: error?.message }, { status: 500 });
    }
}
