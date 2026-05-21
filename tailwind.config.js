/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'turbo-red': '#ca1016',
        'turbo-green': '#7ed321',
        surface: '#f6f7fa',
        ink: '#212c3d',
        muted: '#8d94ad',
      },
    },
  },
  plugins: [],
}
