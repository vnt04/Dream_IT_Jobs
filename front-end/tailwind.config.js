/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main_color_1": "#FEFFFF",
        "main_color_2": "#17252A",
        "background": "#33AFA9"
        
      }
    },
  },
  plugins: [],
}

