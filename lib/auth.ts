import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_me";

export function verifyAdminPassword(password: string): boolean {
    return password === process.env.ADMIN_PASSWORD;
}

export function signToken(): string {
    return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}
