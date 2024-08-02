/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#33AFA9",
      },
      screens: {
        screen4K: "2496px",
        xl: "1440px",
        "2xl": "1920px",
      },
    },
  },
  plugins: [],
};
