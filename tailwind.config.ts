/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "120rem",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        brown: "var(--color-brown)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        sage: "var(--color-sage)",
        black: "var(--color-black)",
        paper: "var(--color-paper)",
      },
      fontFamily: {
        sans: ["Switzer", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
