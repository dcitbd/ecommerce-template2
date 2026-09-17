/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#3730a3",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#312e81",
          900: "#1e1b4b",
          gold: "#D4AF37",
          crimson: "#DC2626",
          emerald: "#059669",
          dark: "#0F172A",
        }
      },
      fontFamily: {
        sans: ["Inter", "Hind Siliguri", "sans-serif"],
      },
    },
  },
  plugins: [],
}
