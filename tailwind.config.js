/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './scripts/*.js'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
