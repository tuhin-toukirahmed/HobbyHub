// tailwind.config.js
export const theme = {
  extend: {
    fontFamily: {
      heading: ["Playfair Display", "serif"],
      body: ["Source Sans Pro", "sans-serif"],
    },
    colors: {
      // Dark theme
      "dark-bg": "#111827",
      "dark-surface": "#1F2937",
      "dark-border": "#374151",
      "dark-text": "#D1D5DB",
      "dark-muted": "#9CA3AF",
      "dark-heading": "#F3F4F6",
      "dark-footer": "#0B1120",

      // Light theme
      "light-bg": "#F9FAFB",
      "light-card": "#FFFFFF",
      "light-section": "#F3F4F6",
      "light-text": "#1F2937",
      "light-muted": "#6B7280",
      "light-heading": "#111827",
      "light-footer": "#E5E7EB",

      primary: "#818CF8",
    },
  },
};
