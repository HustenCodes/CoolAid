module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid'
  ],
  theme: {
    minWidth: {
      '128': '32rem',
      'review-screen': "calc(100vw - 80px)"
    }
  },
  plugins: [],
}
