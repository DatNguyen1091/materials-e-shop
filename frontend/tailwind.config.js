/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#f43f5e',
      },
      fontFamily: {
        sans: ['Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
      })
    }
  ],
}


