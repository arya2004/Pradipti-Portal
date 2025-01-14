/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tp : '#404040',
        myBlue: '#465FF1',
        myRed: '#E42600',
        myGreen: '#3FCA5B',
        myYellow: '#FFC70E',
        textGreen: '#00891B',
        bgGreen: 'rgba(63, 202, 91, 0.26)',
      }
    },
  },
  plugins: [],
};