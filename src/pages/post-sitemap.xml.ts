import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  try {
    // Get the site URL from Astro config, fallback to production URL
    const siteUrl = site?.href || "https://clearpathmind.com";
    const baseUrl = siteUrl.replace(/\/$/, ""); // Remove trailing slash

    // Get blog posts collection
    const blogPosts = await getCollection("blog");

    // Build sitemap entries
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add blog posts
    for (const post of blogPosts) {
      // Remove both .md and .md.md extensions if they exist
      const postSlug = post.id.replace(/\.md\.md$/, "").replace(/\.md$/, "");
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${postSlug}/</loc>
  </url>`;
    }

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "X-Robots-Tag": "noindex", // Don't index the sitemap itself
      },
    });
  } catch (error) {
    console.error("Error generating post sitemap:", error);

    // Return a minimal fallback sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://clearpathmind.com/blog/</loc>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300", // Shorter cache for fallback
      },
    });
  }
};
