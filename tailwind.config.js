/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5B8DEF',
          50: '#F5F8FF',
          100: '#EAF0FE',
          200: '#CFE0FD',
          300: '#A7C3FA',
          400: '#7AA3F6',
          500: '#5B8DEF',
          600: '#3E6FD6',
          700: '#2F56A8',
          800: '#243F7D',
          900: '#1D315F',
        },
        aside: '#1D1E20',
        brandv: 'hsl(var(--brand) / <alpha-value>)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
