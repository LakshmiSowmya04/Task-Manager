/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches your project structure
  ],
  theme: {
    extend: {boxShadow:{
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    }},
  },
  plugins: [],
}
