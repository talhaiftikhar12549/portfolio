import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    publishedAt: string;
}

export default function BlogCard({ title, slug, excerpt, coverImage, tags, publishedAt }: BlogCardProps) {
    const date = new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Link href={`/blog/${slug}`} className="group block">
            <article className="bg-[#0d0d2b] border border-[#1e1e4a] rounded-2xl overflow-hidden hover:border-[#2c2ebf] transition-all duration-300 hover:shadow-[0_0_30px_rgba(44,46,191,0.2)] hover:-translate-y-1">
                {/* Cover Image */}
                <div className="w-full h-48 bg-gradient-to-br from-[#1a1a4e] to-[#0d0d2b] relative overflow-hidden">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[#2c2ebf] text-5xl opacity-30">✦</span>
                        </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d2b]/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 bg-[#2c2ebf]/20 text-[#6b6dff] rounded-full border border-[#2c2ebf]/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h2 className="text-white font-bold text-xl mb-2 group-hover:text-[#6b6dff] transition-colors duration-200 line-clamp-2">
                        {title}
                    </h2>

                    {excerpt && (
                        <p className="text-[#9898b5] text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <time className="text-xs text-[#6b6b8a]">{date}</time>
                        <span className="text-[#2c2ebf] text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                            Read more →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
