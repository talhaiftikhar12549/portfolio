import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Talha Iftikhar",
    description: "Articles and thoughts on software engineering, web development, and technology by Talha Iftikhar.",
};

export const revalidate = 60; // ISR — revalidate every 60s

async function getBlogs() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <main className="min-h-screen bg-[#060614]">
            {/* Nav */}
            <header className="h-[10vh] md:h-[15vh] bg-[#060614] w-full px-5 xl:px-20 border-b border-[#1e1e4a] flex items-center justify-between">
                <Link href="/" className="text-[#d9d7d7] font-bold text-lg hover:text-white transition-colors">
                    &lt; Dev Talha /&gt;
                </Link>
                <nav className="flex gap-6 text-sm font-semibold text-[#d9d7d7]">
                    <Link href="/" className="hover:text-white transition-colors">HOME</Link>
                    <Link href="/blog" className="text-[#6b6dff] hover:text-white transition-colors">BLOG</Link>
                </nav>
            </header>

            {/* Hero */}
            <section className="py-20 px-5 xl:px-20 text-center">
                <span className="inline-block text-[#6b6dff] text-sm font-semibold tracking-widest uppercase mb-4">
                    My Writing
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    The{" "}
                    <span className="bg-gradient-to-r from-[#2c2ebf] to-[#6b6dff] bg-clip-text text-transparent">
                        Blog
                    </span>
                </h1>
                <p className="text-[#9898b5] text-lg max-w-xl mx-auto">
                    Thoughts on software engineering, web development, and building things that matter.
                </p>
            </section>

            {/* Blog Grid */}
            <section className="px-5 xl:px-20 pb-20 max-w-7xl mx-auto">
                {blogs.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-5xl mb-4">✍️</p>
                        <p className="text-[#9898b5] text-xl font-semibold">No posts yet.</p>
                        <p className="text-[#6b6b8a] mt-2">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog: {
                            id: string;
                            title: string;
                            slug: string;
                            excerpt: string;
                            coverImage: string;
                            tags: string[];
                            publishedAt: string;
                        }) => (
                            <div key={blog.id}>
                                <Link href={`/blog/${blog.slug}`} className="group block">
                                    <article className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl overflow-hidden hover:border-[#2c2ebf] transition-all duration-300 hover:shadow-[0_0_30px_rgba(44,46,191,0.2)] hover:-translate-y-1">
                                        <div className="w-full h-48 bg-gradient-to-br from-[#1a1a4e] to-[#0d0d2b] relative overflow-hidden">
                                            {blog.coverImage ? (
                                                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-[#2c2ebf] text-5xl opacity-30">✦</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d2b]/80 to-transparent" />
                                        </div>
                                        <div className="p-6">
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {blog.tags.slice(0, 3).map((tag: string) => (
                                                        <span key={tag} className="text-xs px-2 py-1 bg-[#2c2ebf]/20 text-[#6b6dff] rounded-full border border-[#2c2ebf]/30">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                            <h2 className="text-white font-bold text-xl mb-2 group-hover:text-[#6b6dff] transition-colors line-clamp-2">{blog.title}</h2>
                                            {blog.excerpt && <p className="text-[#9898b5] text-sm leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>}
                                            <div className="flex items-center justify-between">
                                                <time className="text-xs text-[#6b6b8a]">{new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                                                <span className="text-[#2c2ebf] text-sm font-semibold group-hover:translate-x-1 transition-transform">Read more →</span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
