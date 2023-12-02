export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      margin: {
        '3px': '3px'
      }
    }
  },
  plugins: [require('daisyui')]
}
