/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#800000', // Maroon background
        gold: '#f2af08', // Gold accents
        yellow: {
          300: '#fbc02d', // Gold yellow shade for hover effects
        },
        lightgold:'#ecd76a',
        
      },
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}