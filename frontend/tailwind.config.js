/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',    // Deep blue/purple
        secondary: '#facc15',  // Yellow accent
        accent: '#10b981',     // Green accent
        background: '#f3f4f6', // Light gray background

      },
    fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


