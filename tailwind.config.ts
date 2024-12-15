import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "#1A1F2C",
        foreground: "#C8C8C9",
        accent: "#517fa4",
        card: "rgba(26, 31, 44, 0.7)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #243949 0%, #517fa4 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;