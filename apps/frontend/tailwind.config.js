/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    fontFamily: {
      incon: ['Inconsolata', 'monospace'],
      nunito: ['NunitoSans', 'sans-serif'],
      rajd: ['Rajdhani', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'nx-template-purple-blue': '#6A6A9F',
        'nx-template-black-eclipse': '#0F0F13',
        'nx-template-blue': '#023AFF',
        'nx-template-purple': '#991BFA',
        'nx-template-pinky': '#FF00B2',
        'nx-template-blueish-night': '#191932',
        'nx-template-darker-purple-blue': '#404080',
        'nx-template-bright-yellow': '#FFFF00',
        'nx-template-electric-blue-marine': '#01F1E3',
        'nx-template-dark-green': '#007B05',
        'nx-template-black-night': '#05050F',
        'nx-template-dark-purple-grey': '#3D3D4D',
        'nx-template-electric-green': '#5EFF5A',
        'nx-template-orange': '#FF6900',
        'nx-template-medim-green': '#00FF17',
        'nx-template-night': '#0E1833',
        'nx-template-medium-purple-grey': '#666680',
        'nx-template-red': '#FF2D2E',
        'nx-template-persian-blue': '#3506EF',
        'nx-template-purple-blueish': '#202040',
        'nx-template-bright-purple-grey': '#B8B8CC',
        'nx-template-new-green': '#03ED96',
        'nx-template-moderate-aspid-blue': '#8855E8',
        'nx-template-sea-green': '#15FFAB',
        'nx-template-main-red': '#FD4438',
        'nx-template-dark-blue': '#05050f',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
