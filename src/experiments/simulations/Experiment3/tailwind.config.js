/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0066ff',
        'neutral-gray': '#666666',
        'ground-green': '#00aa00',
        'power-red': '#ff3333',
      },
      animation: {
        'pulse-current': 'pulse-current 1s ease-in-out infinite',
        'flash-bulb': 'flash-bulb 0.3s ease-in-out',
      },
      keyframes: {
        'pulse-current': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'flash-bulb': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}