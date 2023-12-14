/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    container:{
      padding:{
        default:"15px"
      }
    },
    fontFamily:{
      primary:"Orbitron",
      tertiary:"Rajdhani",
      secondary:"Aldrich"
    },
    screens:{
      sm:"640px",
      md:"768px",
      lg:"960px",
      xl:"1200px"
    },
    extend: {
      colors:{
        primary:"",
        secondary:"",
        tertiary:""
      },
      backgroundImage:{
        'profile': "url('/assets/img/gab.png')"
      }
    }
  },
  plugins: [],
}

