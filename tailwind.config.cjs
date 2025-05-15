const { resolveProjectPath } = require('wasp/dev')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  colors.blue[50],
          100: colors.blue[100],
          200: colors.blue[200],
          300: colors.blue[300],
          400: colors.blue[400],
          500: colors.blue[500],
          600: colors.blue[600],
          700: colors.blue[700],
          800: colors.blue[800],
          900: colors.blue[900],
        }
      }
    },
  },
}