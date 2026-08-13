/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        matcha: {
          50: '#f3f6ef',
          100: '#e4eadc',
          200: '#cfdac2',
          300: '#b7c9a8',
          400: '#94ad82',
          500: '#748f63',
          600: '#596f4b',
          700: '#46593d',
          800: '#394833',
          900: '#303d2c'
        },
        paper: '#f7f6f1',
        ink: '#191b1a'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Inter', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
