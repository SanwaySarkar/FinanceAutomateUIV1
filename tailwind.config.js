/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1a1f2e',
        'darker-blue': '#151922',
        'light-blue': '#2a3142',
        'accent-blue': '#3b82f6',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}