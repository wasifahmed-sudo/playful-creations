
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
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite alternate",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%": { boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.4)" },
          "100%": { boxShadow: "0 0 40px 20px rgba(139, 92, 246, 0.7)" },
        },
        "float": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
