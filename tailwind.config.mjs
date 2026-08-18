/** @type {import('tailwindcss').Config} */
import chroma from "chroma-js";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: generateShades("#283854"),
        secondary: generateShades("#ffca2c"),
        action: generateShades("#198754"),
        accent: generateShades("#fde047"),
        base: {
          50: "#f8f9fa",
          100: "#ffffff",
          200: "#e9ecef",
          // Customize further if needed
        },
      },
    },
  },
  plugins: [],
};

function generateShades(color) {
  const scale = chroma
    .scale([chroma(color).brighten(3), chroma(color).darken(1)])
    .mode("lab");

  return {
    50: scale(0.9).hex(), // Very light
    100: scale(0.8).hex(),
    200: scale(0.6).hex(),
    300: scale(0.4).hex(),
    400: scale(0.2).hex(),
    500: color, // Base color
    600: scale(0.15).hex(), // Darker but not too dark
    700: scale(0.25).hex(),
    800: scale(0.35).hex(),
    900: scale(0.45).hex(), // Darkest
  };
}
