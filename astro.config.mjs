import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { imageService } from "@unpic/astro/service";

import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://clearpathmind.com",
  base: "/",
  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "constrained",
      cache: {
        // Add cache control to prevent corruption
        maxAge: 60 * 60 * 24 * 7, // 7 days
        staleWhileRevalidate: 60 * 60 * 24 * 30, // 30 days
      },
    }),
    // Disable Astro's built-in image optimization to prevent conflicts
    remotePatterns: [],
  },
  integrations: [
    tailwind({
      config: {
        corePlugins: {
          preflight: false,
        },
      },
    }),
    react(),
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
