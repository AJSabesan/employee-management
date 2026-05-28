/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        brand1: "#667eea",
        brand2: "#764ba2",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(102,126,234,0.35)",
        glow: "0 20px 60px -15px rgba(118,75,162,0.5)",
      },
      animation: {
        "bounce-slow": "bounce-slow 2.4s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16,1,0.3,1)",
        "fade-in": "fade-in 0.25s ease-out",
        "spin-slow": "spin 0.8s linear infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        float: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-30px) scale(1.1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
