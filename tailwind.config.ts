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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#8B5CF6", // A soft purple/violet for highlights
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
