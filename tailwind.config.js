/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        navy: { 50: '#eef4fb', 100: '#d9e6f5', 600: '#1e4e8c', 700: '#16407a', 800: '#0f2f5c', 900: '#0a2244' },
        mint: { 50: '#effaf3', 100: '#d8f3e3', 500: '#4cae7d' },
      },
    },
  },
  plugins: [],
}
