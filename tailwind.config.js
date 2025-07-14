/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
  'circuit-wire',
  'wire-hot',
  'wire-neutral',
  'wire-ground',
  'current-flow',
  'bulb-on',
  'bulb-off',
  'switch-on',
  'switch-off',
],

};

