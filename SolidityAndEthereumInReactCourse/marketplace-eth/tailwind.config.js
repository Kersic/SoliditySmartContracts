/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        "2": "2 2 0%",
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%"
      },
      maxWidth: {
        "8xl": "1920px"
      },
      screens: {
        "xs": "475px",
        ...defaultTheme.screens
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
}
