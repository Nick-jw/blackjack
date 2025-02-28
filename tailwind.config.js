// tailwind.config.js (ES Module syntax)
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // adjust this to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['serif'],
      },
    },
  },
  plugins: [],
};
