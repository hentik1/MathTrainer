/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        survivalAnimation: {
          "0%": {transform: "scale(1)"},
          "50%": {transform: "scale(1.5)"},
          "75%": {transform: "scale(1)"},
          "100%": {transform: "scale(1.5)"},
        },
      },
      animation: {
        "survivalAnimation": "survivalAnimation 0.5s infinite",
      }
    },
  },
  plugins: [],
}

