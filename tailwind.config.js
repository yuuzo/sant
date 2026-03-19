/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        santander: {
          red: '#ec0000',
          darkRed: '#cc0000',
          gray: '#f5f5f5',
          darkGray: '#444444',
        }
      }
    },
  },
  plugins: [],
}
