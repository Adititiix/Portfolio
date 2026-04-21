/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: { hot: '#FF1F8E', light: '#FF6BB5' },
        yellow: { electric: '#FFE500', soft: '#FFF176' },
        blue: { electric: '#00B4FF', dark: '#0066FF' },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
