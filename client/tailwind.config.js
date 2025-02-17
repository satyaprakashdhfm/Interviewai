/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      //colors used 
      colors:{
        primary:"#2B85FF",
        secondary:"#EF863E",
        customGray: 'rgb(63, 61, 61)'
      }
    },
  },
  plugins: [],
}