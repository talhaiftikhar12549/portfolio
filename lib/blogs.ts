import { adminDb } from "@/lib/firebase-admin";

export async function getBlogsData() {
    if (!adminDb) {
        console.warn("Firebase admin not initialized, returning empty blogs");
        return [];
    }

    try {
        // Fetch all published blogs without orderBy to avoid requiring a composite index
        const snapshot = await adminDb
            .collection("blogs")
            .where("published", "==", true)
            .get();

        const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

        // Sort by publishedAt descending in JavaScript
        blogs.sort((a, b) => {
            const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return bTime - aTime;
        });

        return blogs;
    } catch (error) {
        console.error("Error fetching blogs in getBlogsData:", error);
        return [];
    }
}
