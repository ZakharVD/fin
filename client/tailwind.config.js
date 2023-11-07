/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "logo": ["Lexend", "sans-serif"]
      },
      screens: {
        "phone": "500px"
      },
      colors: {
        "background": "#f1f1f1",
        "sidebar": "#1b1c32",
        "blue": "#2883e2",
        "blue-hover": "#1c6ec6",
        "purple": "#b67af5",
        "lightorange": "#faa08a",
        "housing": "#ee821a",
        "food": "#3a7ff2",
        "health": "#65dd91",
        "entertainment": "#53dbf2",
        "transportation": "#f34a62",
        "education": "#ffcb50",
        "debt": "#b67af5",
        "other": "#ed90cf"
      }
    },
  },
  plugins: [],
}

