/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': 'Poppins'
      },
      colors: {
        fondo: 'hsl(0, 0%, 94%)',
        morado: 'hsl(259, 100%, 65%)',
        error: 'hsl(0, 100%, 67%)',
        lightGrey: 'hsl(0, 0%, 86%)',
        smokeyGrey: 'hsl(0, 1%, 44%)',
        offBlack: 'hsl(0, 0%, 8%)',
      },
    },
  },
  plugins: [],
}

