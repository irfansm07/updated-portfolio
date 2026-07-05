import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Portfolio design system
        "space-black": "#000000",
        "space-dark": "#0a0a1a",
        "space-card": "rgba(10,10,30,0.6)",
        "indigo-glow": "#6366f1",
        "indigo-soft": "#818cf8",
        "indigo-light": "#a5b4fc",
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
