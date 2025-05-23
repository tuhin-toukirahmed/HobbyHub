// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        // Removed custom colors for DaisyUI themes. Use DaisyUI's built-in themes instead.
        // If you want to keep custom colors for your own classes, you can move them outside DaisyUI theme usage.
      },
    },
  },
  plugins: [import('daisyui')],
  daisyui: {
    themes: ["light","night", "corporate"],
  },
};
