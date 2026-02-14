/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Deep Navy
        secondary: "#14b8a6", // Teal
        accent: "#e0f2fe", // Soft Blue
        neutral: "#f3f4f6", // Light Gray
        "base-100": "#ffffff", // White
      },
      fontFamily: {
        roboto: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        PermanentMarker: ["Permanent Marker", "cursive"],
        Pacifico: ["Pacifico", "cursive"],
        LuckiestGuy: ["Luckiest Guy", "cursive"],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0f172a", // Deep Navy
          "secondary": "#14b8a6", // Teal
          "accent": "#e0f2fe", // Soft Blue
          "neutral": "#f3f4f6", // Light Gray
          "base-100": "#ffffff", // White
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
