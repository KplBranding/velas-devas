/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondos
        'bg-base':    '#F5F5EE',
        'bg-hero':    '#ECEEE1',
        'bg-card-1':  '#E6E9D6',
        'bg-card-2':  '#DBDFC7',
        'bg-footer':  '#283028',

        // Textos
        'text-primary': '#1E251E',
        'text-body':    '#2C352C',
        'text-muted':   '#525E4B',
        'text-footer':  '#A2AE99',

        // Bordes
        'border-default': '#D7DBC6',
        'border-dark':    '#3B443B',

        // Acentos (paleta verde salvia)
        'gold':         '#485848', // Verde Grafito (acento principal, ex-dorado)
        'gold-light':   '#C8D0A8', // Crema Verde
        'graphite':     '#283028', // Verde Negro (botón primario)
        'black-graphic':'#283028', // Verde Negro
        'verde-negro':  '#283028',
        'verde-grafito':'#485848',
        'verde-medio':  '#607860',
        'verde-musgo':  '#708870',
        'verde-pizarra':'#606878',
        'crema-verde':  '#C8D0A8',
        'blanco-calido':'#F5F5EE',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        sans:    ['var(--font-sans)', 'Lato', 'sans-serif'],
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
};
