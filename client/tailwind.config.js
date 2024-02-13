/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3983de",
          "secondary": "#eb9985",
          "accent": "#d9e254",
          "neutral": "#0b2c41",
          "base-100": "#f9fcfe",
        },
        dark: {
          "primary": "#216bc4",
          "secondary": "#7b2914",
          "accent": "#a1aa1d",
          "neutral": "#0f2e3d",
          "base-100": "#010304",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}