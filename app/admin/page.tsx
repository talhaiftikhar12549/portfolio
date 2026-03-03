"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    tags: string[];
    publishedAt: string;
}

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    async function fetchBlogs() {
        try {
            const res = await fetch("/api/admin/blogs");
            const data = await res.json();
            if (Array.isArray(data)) {
                setBlogs(data);
            } else {
                setError(data?.error || "Failed to load blogs");
                setBlogs([]);
            }
        } catch {
            setError("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchBlogs(); }, []);

    async function handleDelete(slug: string, title: string) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        setDeleting(slug);
        try {
            const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
            if (res.ok) setBlogs((prev) => prev.filter((b) => b.slug !== slug));
            else alert("Failed to delete. Try again.");
        } catch {
            alert("Error deleting post.");
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white">Dashboard</h1>
                    <p className="text-[#9898b5] mt-1">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/new"
                    className="bg-[#2c2ebf] hover:bg-[#3a3ccc] text-white font-bold px-5 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(44,46,191,0.4)] flex items-center gap-2"
                >
                    <span>✍️</span> New Post
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl p-6">
                    <p className="text-[#9898b5] text-sm font-semibold mb-1">Total Posts</p>
                    <p className="text-4xl font-black text-white">{blogs.length}</p>
                </div>
                <div className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl p-6">
                    <p className="text-[#9898b5] text-sm font-semibold mb-1">Published</p>
                    <p className="text-4xl font-black text-[#6b6dff]">{blogs.length}</p>
                </div>
                <div className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl p-6">
                    <p className="text-[#9898b5] text-sm font-semibold mb-1">Latest Post</p>
                    <p className="text-sm font-bold text-white line-clamp-1">
                        {blogs[0]?.title || "No posts yet"}
                    </p>
                </div>
            </div>

            {/* Blog Table */}
            <div className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1e1e4a]">
                    <h2 className="text-white font-bold">All Posts</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-3">⚠️</p>
                        <p className="text-red-400 font-semibold">{error}</p>
                        <p className="text-[#9898b5] text-sm mt-2">Check that Firebase Admin SDK credentials are set in .env.local</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-3">✍️</p>
                        <p className="text-[#9898b5] font-semibold">No posts yet.</p>
                        <Link href="/admin/new" className="mt-4 inline-block text-[#6b6dff] hover:underline">
                            Create your first post →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[#1e1e4a]">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#1a1a4e]/30 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold truncate">{blog.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-[#6b6b8a]">
                                            {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </span>
                                        {blog.tags?.slice(0, 2).map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-0.5 bg-[#2c2ebf]/20 text-[#6b6dff] rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        target="_blank"
                                        className="px-3 py-2 text-xs font-semibold text-[#9898b5] hover:text-white bg-[#1e1e4a] rounded-lg transition-colors"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/admin/edit/${blog.slug}`}
                                        className="px-3 py-2 text-xs font-semibold text-[#6b6dff] bg-[#2c2ebf]/20 hover:bg-[#2c2ebf]/40 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.slug, blog.title)}
                                        disabled={deleting === blog.slug}
                                        className="px-3 py-2 text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {deleting === blog.slug ? "…" : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
