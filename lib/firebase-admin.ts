import admin from "firebase-admin";

let adminDb: admin.firestore.Firestore | null = null;
let adminStorage: admin.storage.Storage | null = null;

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
        adminDb = admin.firestore();
        adminStorage = admin.storage();
    } catch (err) {
        console.error("[firebase-admin] Failed to initialize:", err);
    }
} else {
    adminDb = admin.firestore();
    adminStorage = admin.storage();
}

export { adminDb, adminStorage };
export default admin;

