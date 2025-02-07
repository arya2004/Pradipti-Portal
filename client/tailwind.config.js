/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
      colors: {
        tp : '#404040',
        myBlue: '#465FF1',
        myRed: '#E42600',
        myGreen: '#3FCA5B',
        myYellow: '#FFC70E',
        textGreen: '#00891B',
        bgGreen: 'rgba(63, 202, 91, 0.26)',
        bgRed: 'rgba(228, 38, 0, 0.15)',
        myGray: "rgba(217, 217, 217, 0.42)",
        textGray: "#525252",
        bgGray: "#ECEAEA",
        dropBG: "rgba(70, 95, 241, 0.14)",
        notifColours:"#5E5E5E",
        currcol :"#494949",
        warningRed : "#9A0000",
        faintGray: "#737373",
        collegeDetailsBlack:"#262626",
        collegeDetailsTableBackground: "rgba(112, 132, 154, 0.23)",
        programsBlack:"#343434",
        borderColours: "#8C8C8C"

      }
    },
  },
  plugins: [],
};