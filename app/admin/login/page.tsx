"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Invalid password");
            } else {
                router.push("/admin");
            }
        } catch {
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#060614] flex items-center justify-center px-4">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2c2ebf]/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Title */}
                <div className="text-center mb-10">
                    <p className="text-[#6b6dff] text-sm font-semibold tracking-widest uppercase mb-3">Admin Access</p>
                    <h1 className="text-4xl font-black text-white">&lt; Dev Talha /&gt;</h1>
                    <p className="text-[#9898b5] mt-2 text-sm">Enter your password to manage the blog</p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl p-8 shadow-[0_0_60px_rgba(44,46,191,0.1)]"
                >
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-[#9898b5] text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                            className="w-full bg-[#060614] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]"
                        />
                    </div>

                    {error && (
                        <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2c2ebf] hover:bg-[#3a3ccc] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(44,46,191,0.4)]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing in…
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
