/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Inter", "sans-serif"],           // <-- changed from Roboto to Inter
      PermanentMarker: ["Permanent Marker", "cursive"],
      Pacifico: ["Pacifico", "cursive"],
      LuckiestGuy: ["Luckiest Guy", "cursive"],
    }
  },
  plugins: [
    require('daisyui'),
  ],
}
