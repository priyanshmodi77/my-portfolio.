import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#edf5ff",
        ink: "#0a0d12",
      },
      fontFamily: {
        display: ["var(--font-albert-sans)", "sans-serif"],
        mono: ["var(--font-fragment-mono)", "monospace"],
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
