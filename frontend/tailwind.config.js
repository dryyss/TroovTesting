module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fff9',
          100: '#b3ffed',
          200: '#80ffe1',
          300: '#4dffd5',
          400: '#1affc9',
          500: '#00E5B0',
          600: '#00b38a',
          700: '#008066',
          800: '#004d3d',
          900: '#001a15',
        },
        secondary: {
          50: '#e5f6ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab2ff',
          500: '#0091e5',
          600: '#0071b3',
          700: '#005280',
          800: '#00324d',
          900: '#00111a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
