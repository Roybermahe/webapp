/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/preline/preline.js',
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}