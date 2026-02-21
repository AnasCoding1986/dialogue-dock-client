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
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(20, 184, 166, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.8), 0 0 40px rgba(20, 184, 166, 0.3)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'particle': 'particle-float 15s linear infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 12px 48px rgba(0, 0, 0, 0.12)',
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.3)',
        'glow-teal-lg': '0 0 30px rgba(20, 184, 166, 0.4)',
      },
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

