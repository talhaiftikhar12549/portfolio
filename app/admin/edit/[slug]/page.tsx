"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        tags: "",
        content: "",
    });
    const [originalSlug, setOriginalSlug] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                if (!res.ok) { setError("Post not found."); return; }
                const data = await res.json();
                setOriginalSlug(data.slug);
                setForm({
                    title: data.title || "",
                    slug: data.slug || "",
                    excerpt: data.excerpt || "",
                    coverImage: data.coverImage || "",
                    tags: (data.tags || []).join(", "),
                    content: data.content || "",
                });
            } catch {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        }
        if (slug) load();
    }, [slug]);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Image upload failed.");
            } else {
                setForm((prev) => ({ ...prev, coverImage: data.url }));
            }
        } catch {
            setError("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const res = await fetch(`/api/blogs/${originalSlug}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to update.");
            } else {
                router.push("/admin");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-8 h-8 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white">Edit Post</h1>
                <p className="text-[#9898b5] mt-1">Update your blog post</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Title *</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        required
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all"
                    />
                </div>

                {/* Slug (read-only) */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Slug <span className="font-normal text-[#6b6b8a]">(read-only)</span></label>
                    <div className="flex items-center bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl px-4 py-3 opacity-60">
                        <span className="text-[#3a3a5c] text-sm mr-1">/blog/</span>
                        <span className="text-[#9898b5] text-sm">{form.slug}</span>
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Excerpt</label>
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                        rows={2}
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] transition-all resize-none"
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Cover Image</label>
                    <div className="flex items-center gap-3 mb-2">
                        <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl text-sm text-[#9898b5] hover:border-[#2c2ebf] hover:text-white transition-all">
                            {uploading ? (
                                <><span className="w-4 h-4 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" /> Uploading…</>
                            ) : (
                                <>📁 Replace Image</>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        {form.coverImage && (
                            <img src={form.coverImage} alt="Cover" className="h-10 w-16 object-cover rounded-lg border border-[#1e1e4a]" />
                        )}
                    </div>
                    <input
                        type="text"
                        value={form.coverImage}
                        onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
                        placeholder="Or paste a Cloudinary image URL here…"
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-[#9898b5] rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Tags <span className="font-normal">(comma separated)</span></label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] transition-all"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Content * <span className="font-normal text-[#6b6b8a]">(Markdown)</span></label>
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                        required
                        rows={20}
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] transition-all resize-y font-mono"
                    />
                </div>

                {error && (
                    <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
                )}

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="bg-[#2c2ebf] hover:bg-[#3a3ccc] disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(44,46,191,0.4)] flex items-center gap-2"
                    >
                        {saving ? (
                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                        ) : (
                            "💾 Save Changes"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/admin")}
                        className="px-6 py-3 text-[#9898b5] hover:text-white bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
