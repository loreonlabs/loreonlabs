import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Off-white foundation so white cards/surfaces gain real depth.
        background: {
          DEFAULT: "#F8FAFC", // off-white foundation
          secondary: "#F1F5F9", // tinted bands
          tertiary: "#E9EFF6", // deeper tint
        },
        surface: "#FFFFFF", // card background — pops off the foundation
        "surface-2": "#F1F5F9", // raised / hover
        border: "#E2E8F0", // hairline with definition on off-white
        foreground: "#07101F", // headlines
        body: "#2D3748", // body text
        muted: "#718096", // muted / meta
        accent: {
          DEFAULT: "#00D4FF", // primary accent — fills, CTA, active, highlights
          ink: "#0E7490", // readable accent for text on light
          soft: "#25C9FF", // secondary accent
          blue: "#4F8CFF", // tertiary / charts
          deep: "#00A5C8",
        },
        success: { DEFAULT: "#00E676", ink: "#059669" },
        warning: { DEFAULT: "#FFB547", ink: "#B45309" },
        negative: { DEFAULT: "#FF5D73", ink: "#E11D48" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
      boxShadow: {
        // Soft, premium light-theme shadows.
        glow: "0 12px 32px -10px rgba(0, 180, 235, 0.5)",
        "glow-sm": "0 6px 18px -8px rgba(0, 180, 235, 0.4)",
        card: "0 1px 2px 0 rgba(15,23,42,0.05), 0 14px 36px -18px rgba(15,23,42,0.16)",
        elevate:
          "0 2px 6px 0 rgba(15,23,42,0.06), 0 28px 64px -24px rgba(15,23,42,0.22)",
      },
      keyframes: {
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "mesh-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -2%, 0) scale(1.06)" },
        },
        "mesh-drift-2": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.04)" },
          "50%": { transform: "translate3d(-3%, 2%, 0) scale(1)" },
        },
        "signal-sweep": {
          "0%": { transform: "translate3d(-12%, 0, 0)" },
          "100%": { transform: "translate3d(12%, 0, 0)" },
        },
        wave: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-1.5%, -2.2%, 0)" },
        },
        stream: {
          "0%": { transform: "translateX(-130%)" },
          "100%": { transform: "translateX(130%)" },
        },
        "flow-dash": {
          to: { strokeDashoffset: "-200" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "grid-pan": "grid-pan 8s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "mesh-drift": "mesh-drift 18s ease-in-out infinite",
        "mesh-drift-2": "mesh-drift-2 22s ease-in-out infinite",
        "signal-sweep": "signal-sweep 20s ease-in-out infinite alternate",
        wave: "wave 16s ease-in-out infinite",
        stream: "stream 17s linear infinite",
        "flow-dash": "flow-dash 1.6s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
