import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  try {
    // Get the site URL from Astro config, fallback to production URL
    const siteUrl = site?.href || "https://clearpathmind.com";
    const baseUrl = siteUrl.replace(/\/$/, ""); // Remove trailing slash

    // Static main pages (only indexable ones that render)
    const staticPages = [
      { url: "" }, // Homepage
      { url: "/about" },
      { url: "/contact" },
      { url: "/blog" },
      { url: "/insurance" },
      { url: "/location" },
      { url: "/sitemap" },
      { url: "/thank-you" },
    ];

    // Get dynamic content collections
    const [treatments, programs, locations] = await Promise.all([
      getCollection("treatments"),
      getCollection("programs"),
      getCollection("locations"),
    ]);

    // Build sitemap entries
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    for (const page of staticPages) {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}/</loc>
  </url>`;
    }

    // Add treatment pages - handle .json files properly
    for (const treatment of treatments) {
      // Remove .json extension and use the ID as the slug
      const treatmentSlug = treatment.id.replace(/\.json$/, "");
      sitemap += `
  <url>
    <loc>${baseUrl}/treatment/${treatmentSlug}/</loc>
  </url>`;
    }

    // Add program pages - handle .json files properly
    for (const program of programs) {
      // Remove .json extension and use the ID as the slug
      const programSlug = program.id.replace(/\.json$/, "");
      sitemap += `
  <url>
    <loc>${baseUrl}/program/${programSlug}/</loc>
  </url>`;
    }

    // Add location pages
    for (const location of locations) {
      const locationSlug = location.id.replace(/\.json$/, "");
      sitemap += `
  <url>
    <loc>${baseUrl}/location/${locationSlug}/</loc>
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
    console.error("Error generating page sitemap:", error);

    // Return a minimal fallback sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://clearpathmind.com/</loc>
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
