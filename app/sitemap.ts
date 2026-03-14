import { MetadataRoute } from 'next';
import { getBlogsData } from '@/lib/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.talhaiftikhar.com'; // Or your actual production domain

    // Fetch dynamic blog posts
    const blogs = await getBlogsData();

    // Generate dynamic routes for blogs
    const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.publishedAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...blogUrls,
    ];
}
