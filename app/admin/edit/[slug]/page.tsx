"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("@/app/components/QuillEditor"), { ssr: false });

interface FaqItem { question: string; answer: string; }

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const [form, setForm] = useState({
        title: "", slug: "", excerpt: "", coverImage: "", tags: "", content: "",
        metaTitle: "", metaDescription: "",
    });
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
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
                    metaTitle: data.metaTitle || "",
                    metaDescription: data.metaDescription || "",
                });
                setFaqs(Array.isArray(data.faqs) ? data.faqs : []);
            } catch { setError("Failed to load post."); }
            finally { setLoading(false); }
        }
        if (slug) load();
    }, [slug]);

    /* ── FAQ helpers ───────────────────────────────────── */
    function addFaq() { setFaqs((prev) => [...prev, { question: "", answer: "" }]); }
    function removeFaq(i: number) { setFaqs((prev) => prev.filter((_, idx) => idx !== i)); }
    function updateFaq(i: number, field: keyof FaqItem, val: string) {
        setFaqs((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
    }

    /* ── Image upload ──────────────────────────────────── */
    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true); setError("");
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (!res.ok) setError(data.error || "Image upload failed.");
            else setForm((prev) => ({ ...prev, coverImage: data.url }));
        } catch { setError("Image upload failed. Please try again."); }
        finally { setUploading(false); }
    }

    /* ── Submit ────────────────────────────────────────── */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSaving(true); setError("");
        try {
            let parsedContent = form.content;

            // Extract base64 images and upload them
            const base64Regex = /<img[^>]+src="([^">]+)"/g;
            let match;
            const uploadPromises: Promise<{ oldSrc: string, newSrc: string }>[] = [];

            while ((match = base64Regex.exec(form.content)) !== null) {
                const src = match[1];
                if (src.startsWith("data:image/")) {
                    uploadPromises.push((async () => {
                        try {
                            const res = await fetch(src);
                            const blob = await res.blob();
                            const formData = new FormData();
                            formData.append("file", blob, "image.png");

                            const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
                            const data = await uploadRes.json();
                            if (uploadRes.ok && data.url) {
                                return { oldSrc: src, newSrc: data.url };
                            }
                        } catch (err) {
                            console.error("Failed to upload inline image:", err);
                        }
                        return { oldSrc: src, newSrc: src };
                    })());
                }
            }

            const uploadResults = await Promise.all(uploadPromises);
            for (const { oldSrc, newSrc } of uploadResults) {
                if (oldSrc !== newSrc) {
                    parsedContent = parsedContent.replace(oldSrc, newSrc);
                }
            }

            const res = await fetch(`/api/blogs/${originalSlug}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    content: parsedContent,
                    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
                    faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
                    metaTitle: form.metaTitle,
                    metaDescription: form.metaDescription,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to update.");
            } else {
                router.push("/admin");
            }
        } catch { setError("Something went wrong."); }
        finally { setSaving(false); }
    }

    const inputCls = "w-full bg-[#0d0d2b] border border-[#1e1e4a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]";

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
                    <input type="text" value={form.title} required
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        className={inputCls} />
                </div>

                {/* Slug (read-only) */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">
                        Slug <span className="font-normal text-[#6b6b8a]">(read-only)</span>
                    </label>
                    <div className="flex items-center bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl px-4 py-3 opacity-60">
                        <span className="text-[#3a3a5c] text-sm mr-1">/blog/</span>
                        <span className="text-[#9898b5] text-sm">{form.slug}</span>
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Excerpt</label>
                    <textarea value={form.excerpt} rows={2}
                        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                        className={`${inputCls} resize-none`} />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">Cover Image</label>
                    <div className="flex items-center gap-3 mb-2">
                        <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl text-sm text-[#9898b5] hover:border-[#2c2ebf] hover:text-white transition-all">
                            {uploading
                                ? <><span className="w-4 h-4 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" />Uploading…</>
                                : <>📁 Replace Image</>}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        {form.coverImage && <img src={form.coverImage} alt="Cover" className="h-10 w-16 object-cover rounded-lg border border-[#1e1e4a]" />}
                    </div>
                    <input type="text" value={form.coverImage}
                        onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
                        placeholder="Or paste a Cloudinary image URL here…"
                        className="w-full bg-[#0d0d2b] border border-[#1e1e4a] text-[#9898b5] rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#2c2ebf] focus:ring-1 focus:ring-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]" />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">
                        Tags <span className="font-normal">(comma separated)</span>
                    </label>
                    <input type="text" value={form.tags}
                        onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                        className={inputCls} />
                </div>

                {/* ── SEO Meta ── */}
                <div className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#6b6dff]">🔍 SEO</span>
                    </div>

                    {/* Meta Title */}
                    <div>
                        <label className="block text-[#9898b5] text-sm font-semibold mb-2">
                            Meta Title <span className="font-normal text-[#6b6b8a]">(recommended ≤ 60 chars)</span>
                        </label>
                        <input type="text" value={form.metaTitle}
                            onChange={(e) => setForm((prev) => ({ ...prev, metaTitle: e.target.value }))}
                            placeholder="Defaults to post title if left blank"
                            maxLength={90}
                            className={inputCls} />
                        <p className="text-right text-xs text-[#3a3a5c] mt-1">{form.metaTitle.length} / 60</p>
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label className="block text-[#9898b5] text-sm font-semibold mb-2">
                            Meta Description <span className="font-normal text-[#6b6b8a]">(recommended ≤ 160 chars)</span>
                        </label>
                        <textarea value={form.metaDescription}
                            onChange={(e) => setForm((prev) => ({ ...prev, metaDescription: e.target.value }))}
                            placeholder="Defaults to excerpt if left blank"
                            rows={3} maxLength={200}
                            className={`${inputCls} resize-none`} />
                        <p className="text-right text-xs text-[#3a3a5c] mt-1">{form.metaDescription.length} / 160</p>
                    </div>
                </div>

                {/* ── Content (Quill) ── */}
                <div>
                    <label className="block text-[#9898b5] text-sm font-semibold mb-2">
                        Content * <span className="font-normal text-[#6b6b8a]">(Rich Text)</span>
                    </label>
                    <QuillEditor value={form.content} onChange={(val) => setForm((prev) => ({ ...prev, content: val }))} />
                </div>

                {/* ── FAQ Manager ── */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <label className="text-[#9898b5] text-sm font-semibold">FAQs</label>
                            <p className="text-[#6b6b8a] text-xs mt-0.5">
                                Added as an accordion on the post &amp; in Google "People Also Ask"
                            </p>
                        </div>
                        <button type="button" onClick={addFaq}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#2c2ebf]/20 border border-[#2c2ebf]/40 text-[#6b6dff] rounded-xl text-sm font-semibold hover:bg-[#2c2ebf]/30 transition-all">
                            + Add FAQ
                        </button>
                    </div>

                    {faqs.length === 0 && (
                        <div className="text-center py-8 bg-[#0d0d2b] border border-dashed border-[#1e1e4a] rounded-xl text-[#3a3a5c] text-sm">
                            No FAQs yet. Click "Add FAQ" to create Q&amp;A pairs.
                        </div>
                    )}

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[#6b6dff] text-xs font-bold uppercase tracking-widest">FAQ #{i + 1}</span>
                                    <button type="button" onClick={() => removeFaq(i)}
                                        className="text-red-400/60 hover:text-red-400 text-xs font-semibold transition-colors">
                                        ✕ Remove
                                    </button>
                                </div>
                                <input type="text" value={faq.question}
                                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                                    placeholder="Question…"
                                    className="w-full bg-[#060614] border border-[#1e1e4a] text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2c2ebf] transition-all placeholder:text-[#3a3a5c]" />
                                <textarea value={faq.answer}
                                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                                    placeholder="Answer…" rows={3}
                                    className="w-full bg-[#060614] border border-[#1e1e4a] text-[#c0c0d8] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2c2ebf] transition-all placeholder:text-[#3a3a5c] resize-none" />
                            </div>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
                )}

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={saving || uploading}
                        className="bg-[#2c2ebf] hover:bg-[#3a3ccc] disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(44,46,191,0.4)] flex items-center gap-2">
                        {saving
                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                            : "💾 Save Changes"}
                    </button>
                    <button type="button" onClick={() => router.push("/admin")}
                        className="px-6 py-3 text-[#9898b5] hover:text-white bg-[#0d0d2b] border border-[#1e1e4a] rounded-xl font-semibold transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
