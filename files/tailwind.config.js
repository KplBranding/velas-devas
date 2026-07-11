/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondos
        'bg-base':    '#FAFAF8',
        'bg-hero':    '#F4F2EE',
        'bg-card-1':  '#ECEAE5',
        'bg-card-2':  '#E2DED8',
        'bg-footer':  '#1C1C1A',

        // Textos
        'text-primary': '#111110',
        'text-body':    '#666662',
        'text-muted':   '#AAAAAA',
        'text-footer':  '#777773',

        // Bordes
        'border-default': '#DEDAD4',
        'border-dark':    '#2E2E2C',

        // Acentos
        'gold':         '#A67C2E',
        'gold-light':   '#F0E6CE',
        'graphite':     '#2E2A24',
        'black-graphic':'#111110',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['Lato', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['58px', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'section': ['40px', { lineHeight: '1.1' }],
        'card':    ['15px', { lineHeight: '1.3' }],
        'eyebrow': ['10px', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label':   ['11px', { lineHeight: '1.4' }],
        'body':    ['13px', { lineHeight: '1.7' }],
        'nav':     ['12px', { lineHeight: '1' }],
        'btn':     ['12px', { lineHeight: '1', letterSpacing: '0.06em' }],
      },
      fontWeight: {
        light:   '300',
        regular: '400',
        bold:    '700',
        black:   '900',
      },
      borderWidth: {
        'active': '1.5px',
      },
    },
  },
  plugins: [],
}
