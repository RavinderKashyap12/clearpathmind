import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  try {
    // Get the site URL from Astro config, fallback to production URL
    const siteUrl = site?.href || "https://clearpathmind.com";
    const baseUrl = siteUrl.replace(/\/$/, ""); // Remove trailing slash

    // Build sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/post-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

    return new Response(sitemapIndex, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "X-Robots-Tag": "noindex", // Don't index the sitemap itself
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);

    // Return a minimal fallback sitemap index
    const fallbackSitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://clearpathmind.com/page-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://clearpathmind.com/post-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

    return new Response(fallbackSitemapIndex, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300", // Shorter cache for fallback
      },
    });
  }
};
