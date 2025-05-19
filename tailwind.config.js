/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E35B1',
          light: '#7E57C2',
          dark: '#4527A0',
        },
        secondary: {
          DEFAULT: '#26A69A',
          light: '#4DB6AC',
          dark: '#00897B',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
