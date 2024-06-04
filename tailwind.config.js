/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      PermanentMarker: ["Permanent Marker", "cursive"],
      Pacifico: ["Pacifico", "cursive"],
      LuckiestGuy: ["Luckiest Guy", "cursive"],
    }
  },
  plugins: [
    require('daisyui'),
  ],

}

