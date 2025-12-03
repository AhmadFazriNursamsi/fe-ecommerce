/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#111827",
          foreground: "#F9FAFB"
        },
        accent: {
          DEFAULT: "#0EA5E9",
          muted: "#7DD3FC"
        }
      },
      boxShadow: {
        floating: "0 12px 30px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};
