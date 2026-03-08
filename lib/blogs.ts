import { adminDb } from "@/lib/firebase-admin";

export async function getBlogsData() {
    if (!adminDb) {
        console.warn("Firebase admin not initialized, returning empty blogs");
        return [];
    }

    try {
        const snapshot = await adminDb
            .collection("blogs")
            .where("published", "==", true)
            .orderBy("publishedAt", "desc")
            .get();

        const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return blogs;
    } catch (error) {
        console.error("Error fetching blogs in getBlogsData:", error);
        return [];
    }
}
