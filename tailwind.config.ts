import type { Config } from "tailwindcss";

/**
 * Arrowhead Explorers — brand theme.
 *
 * The color palette is drawn from the owner's home and logo: muted olive/sage,
 * warm cream, natural beige/light wood, and a soft charcoal. To adjust the brand
 * colors site-wide, edit the values below.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        sage: {
          DEFAULT: "#6F7A55", // Forest / sage green (primary)
          light: "#AEB89A", // Light sage
          dark: "#59623F", // Deeper sage for hover/contrast
          50: "#F2F4EC",
          100: "#E4E8D8",
        },
        cream: "#F7F3EB", // Warm cream
        beige: {
          DEFAULT: "#D8C7AE", // Natural beige / light wood
          light: "#E7DCC8",
        },
        charcoal: {
          DEFAULT: "#3E3E3A", // Charcoal gray (primary text)
          light: "#5C5C56",
        },
        offwhite: "#FCFBF8", // Soft white (page background)
        linen: "#EFE9DE", // Warm off-cream (alternating sections)
        pine: "#3D4636", // Deep forest green (dark sections)
        moss: "#C3C9AF", // Pale green
        wood: "#B79A74", // Warm wood / tan accent
        goldenrod: "#C6A15B", // Sparing warm accent (sun, focus)
        water: "#A9C6D8", // Soft lake blue (parent portal accent)
        berry: "#C1485F", // Error / alert (portal forms)
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        hand: ["var(--font-hand)", "ui-serif", "cursive"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(62, 62, 58, 0.18)",
        card: "0 8px 30px -12px rgba(89, 98, 63, 0.22)",
        lift: "0 20px 50px -20px rgba(89, 98, 63, 0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "leaf-drift": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0.35" },
          "50%": { transform: "translateY(-14px) rotate(8deg)", opacity: "0.6" },
          "100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.35" },
        },
        "leaf-drift-slow": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0.25" },
          "50%": { transform: "translateY(-20px) rotate(-6deg)", opacity: "0.5" },
          "100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.25" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "leaf-drift": "leaf-drift 7s ease-in-out infinite",
        "leaf-drift-slow": "leaf-drift-slow 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
