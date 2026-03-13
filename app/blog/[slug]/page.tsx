"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface FaqItem { question: string; answer: string; }

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    content: string;
    publishedAt: string;
    updatedAt: string;
    faqs?: FaqItem[];
}

function BlogFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    if (!faqs || faqs.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <div className="mt-16 pt-8 border-t border-[#1e1e4a]">
                <h2 className="text-2xl font-black text-white mb-2">Frequently Asked Questions</h2>
                <p className="text-[#9898b5] text-sm mb-6">Related questions about this topic</p>
                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                    ? "border-[#2c2ebf] shadow-[0_0_25px_rgba(44,46,191,0.15)]"
                                    : "border-[#1e1e4a] hover:border-[#2c2ebf]/50"
                                    } bg-[#0d0d2b]`}>
                                <button onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left group"
                                    aria-expanded={isOpen}>
                                    <span className={`font-semibold text-sm transition-colors ${isOpen ? "text-[#6b6dff]" : "text-white group-hover:text-[#6b6dff]"}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#2c2ebf] text-white rotate-45" : "bg-[#1e1e4a] text-[#6b6dff] rotate-0"}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-[#9898b5] text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                if (res.status === 404) { setNotFound(true); return; }
                const data = await res.json();
                setBlog(data);
            } catch { setNotFound(true); }
            finally { setLoading(false); }
        }
        if (slug) fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060614] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#2c2ebf] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className="min-h-screen bg-[#060614] flex flex-col items-center justify-center text-[#d9d7d7]">
                <p className="text-6xl mb-4">404</p>
                <p className="text-2xl font-bold mb-2">Post not found</p>
                <Link href="/blog" className="mt-4 text-[#6b6dff] hover:underline">← Back to Blog</Link>
            </div>
        );
    }

    const date = new Date(blog.publishedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });

    // Detect if content is HTML (from Quill) or Markdown (legacy plain text)
    const isHtml = blog.content?.trimStart().startsWith("<");

    return (
        <main className="min-h-screen bg-[#060614]">
            {/* Nav */}
            <header className="h-[10vh] md:h-[12vh] bg-[#060614]/95 backdrop-blur-md w-full px-5 xl:px-20 border-b border-[#1e1e4a] flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="text-[#d9d7d7] font-bold text-lg hover:text-white transition-colors">
                    &lt; Dev Talha /&gt;
                </Link>
                <Link href="/blog" className="text-[#9898b5] hover:text-white text-sm font-semibold transition-colors">
                    ← All Posts
                </Link>
            </header>

            {/* Cover Image */}
            {blog.coverImage && (
                <div className="w-full h-72 md:h-96 relative overflow-hidden">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060614]" />
                </div>
            )}

            {/* Article */}
            <article className="max-w-3xl mx-auto px-5 py-12">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map((tag) => (
                            <span key={tag} className="text-xs px-3 py-1 bg-[#2c2ebf]/20 text-[#6b6dff] rounded-full border border-[#2c2ebf]/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{blog.title}</h1>
                {blog.excerpt && <p className="text-[#9898b5] text-lg mb-6 leading-relaxed">{blog.excerpt}</p>}

                <div className="flex items-center gap-3 mb-12 pb-8 border-b border-[#1e1e4a]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c2ebf] to-[#6b6dff] flex items-center justify-center text-white font-bold text-sm">T</div>
                    <div>
                        <p className="text-white font-semibold text-sm">Talha Iftikhar</p>
                        <time className="text-[#6b6b8a] text-xs">{date}</time>
                    </div>
                </div>

                {/* Content — HTML (Quill) or plain text */}
                {isHtml ? (
                    <div
                        className="prose prose-invert max-w-none break-words whitespace-pre-wrap
                            prose-headings:text-white prose-headings:font-bold
                            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                            prose-p:text-[#c0c0d8] prose-p:leading-relaxed
                            prose-a:text-[#6b6dff] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-em:text-[#c0c0d8]
                            prose-code:text-[#6b6dff] prose-code:bg-[#1a1a4e] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-[#0d0d2b] prose-pre:border prose-pre:border-[#1e1e4a] prose-pre:rounded-xl
                            prose-blockquote:border-[#2c2ebf] prose-blockquote:text-[#9898b5]
                            prose-li:text-[#c0c0d8]
                            prose-img:rounded-xl prose-img:border prose-img:border-[#1e1e4a]
                            prose-hr:border-[#1e1e4a]"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                ) : (
                    <pre className="whitespace-pre-wrap break-words text-[#c0c0d8] leading-relaxed font-sans text-base">{blog.content}</pre>
                )}

                {/* Per-Blog FAQ Accordion */}
                {blog.faqs && blog.faqs.length > 0 && <BlogFaqAccordion faqs={blog.faqs} />}

                {/* Back link */}
                <div className="mt-16 pt-8 border-t border-[#1e1e4a]">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[#6b6dff] hover:text-white font-semibold transition-colors">
                        ← Back to all posts
                    </Link>
                </div>
            </article>
        </main>
    );
}
