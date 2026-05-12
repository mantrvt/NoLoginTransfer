/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        highlight: "#00FF5E",
        base: "#06923E",
        "muted-sage": "#6F8477",
        "soft-mint": "#A3FFC6",
        "deep-forest": "#0F3A20",
        "medium-sage": "#8FB89E",
        "warning-gold": "#FFD700",
        offwhite: "#E2E8F0",
        "dark-gray": "#737373",
        "medium-gray": "#404040",
        charcoal: "#131413",
        "deep-black": "#000000",
        "near-black": "#1B221B",
        "very-dark": "#171917",
        darkest: "#1A1C1A",
      },
      fontFamily: {
        display: ['GeistPixelSquare', 'ui-monospace', 'monospace'],
        mono: ['GeistMono', 'monospace'],
        code: ['monospace', 'ui-monospace'],
      },
      boxShadow: {
        glow: 'rgba(34, 197, 94, 0.05) 0px 0px 15px 0px',
        'glow-hover': 'rgba(34, 197, 94, 0.1) 0px 0px 25px 0px',
        raised: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px',
        elevated: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
        modal: 'rgba(0, 0, 0, 0.3) 0px 10px 25px 0px',
      }
    },
  },
  plugins: [],
}