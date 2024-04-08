/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "txt_color_1": "#FEFFFF",
        "txt_color_2": "#17252A",
        "background": "#33AFA9"
        
      }
    },
  },
  plugins: [],
}

