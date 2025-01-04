/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#014380',
          light: '#014482',
          dark: '#013670',
        }
      }
    },
  },
  plugins: [],
};