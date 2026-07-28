export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D14",
        surface: "#12151F",
        "surface-hover": "#1A1E2B",
        border: "#242A3A",
        muted: "#8A93A8",
        accent: {
          DEFAULT: "#F2B84B",
          hover: "#F7CD73",
          soft: "#F2B84B1A",
        },
        live: "#34D399",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
