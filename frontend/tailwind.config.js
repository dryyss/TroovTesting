module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E5FFF9',
          100: '#B3FFE6',
          200: '#80FFD9',
          300: '#4DFFCC',
          400: '#1AFFBF',
          500: '#00E5B0',
          600: '#00B38A',
          700: '#008066',
          800: '#004D40',
          900: '#001A15',
        },
      },
    },
  },
  plugins: [],
}
