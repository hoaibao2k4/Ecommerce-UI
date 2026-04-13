/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Defined as 'primary' - previously missing!
        "primary-hover": "#4f46e5",
        secondary: "#ec4899",
        background: "#f8fafc",
        foreground: "#1e1e1e",
        "soft-bg": "#ffffff",
        muted: "#64748b",
        border: "#e2e8f0",
      },
    },
  },
  plugins: [],
}
