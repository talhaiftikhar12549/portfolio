"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function NewPostPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        tags: "",
        content: "",
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;
        setForm((prev) => ({
            ...prev,
            title,
            slug: slugify(title),
        }));
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const storageRef = ref(storage, `blog-covers/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setForm((prev) => ({ ...prev, coverImage: url }));
        } catch {
            setError("Image upload failed. Check Firebase Storage settings.");
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to publish.");
            } else {
                router.push("/admin");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white">New Post</h1>
                <p className="text-[#9898b5] mt-1">Write and publish a new blog post</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Title *</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={handleTitleChange}
                        placeholder="My awesome blog post"
                        required
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Slug *</label>
                    <div className="flex items-center bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl px-4 py-3 focus-within:border-[#2c2ebf] transition-all">
                        <span className="text-[#3a3a5c] text-sm mr-1">/blog/</span>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                            required
                            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#3a3a5c]"
                            placeholder="my-awesome-blog-post"
                        />
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Excerpt</label>
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="A short summary of your post…"
                        rows={2}
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c] resize-none"
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Cover Image</label>
                    <div className="flex items-center gap-3">
                        <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl text-sm text-[#9898b5] hover:border-[#2c2ebf] hover:text-white transition-all">
                            {uploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" />
                                    Uploading…
                                </>
                            ) : (
                                <>📁 Upload Image</>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        {form.coverImage && (
                            <img src={form.coverImage} alt="Cover preview" className="h-10 w-16 object-cover rounded-lg border border-[#1e1e4a]" />
                        )}
                    </div>
                    {form.coverImage && (
                        <input
                            type="text"
                            value={form.coverImage}
                            onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
                            className="mt-2 w-full bg-[#0d0d2b] border border-[#1e1e4a] text-[#9898b5] rounded-xl px-4 py-2 text-xs outline-none"
                        />
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Tags <span className="font-normal">(comma separated)</span></label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                        placeholder="Next.js, React, Web Dev"
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]"
                    />
                </div>

                {/* Content */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-[#9898b5] text-sm font-semibold">Content * <span className="font-normal text-[#6b6b8a]">(Markdown)</span></label>
                        <button
                            type="button"
                            onClick={() => setPreview(!preview)}
                            className="text-xs text-[#6b6dff] hover:text-white transition-colors font-semibold"
                        >
                            {preview ? "← Edit" : "Preview →"}
                        </button>
                    </div>
                    {preview ? (
                        <div className="min-h-[400px] bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl p-6 text-[#c0c0d8] prose prose-invert max-w-none prose-headings:text-white prose-code:text-[#6b6dff] prose-a:text-[#6b6dff]">
                            <p className="text-[#6b6b8a] text-sm italic">Preview mode — markdown not rendered here, will render on the post page.</p>
                            <pre className="whitespace-pre-wrap text-sm text-[#c0c0d8] mt-4">{form.content || "Nothing to preview yet."}</pre>
                        </div>
                    ) : (
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                            placeholder="# My Post Title&#10;&#10;Write your content in **Markdown**…"
                            required
                            rows={20}
                            className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c] resize-y font-mono"
                        />
                    )}
                </div>

                {error && (
                    <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="bg-[#2c2ebf] hover:bg-[#3a3ccc] disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(44,46,191,0.4)] flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Publishing…
                            </>
                        ) : (
                            "🚀 Publish Post"
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
