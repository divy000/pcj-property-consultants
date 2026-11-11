/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E4EFE8',
          200: '#C7DEC6',
          300: '#9CBD9A',
          400: '#6E986C',
          500: '#4A7648',
          600: '#375E36',
          700: '#2A4A2B',
          800: '#1F3721',
          900: '#142516',
          950: '#0C170E',
        },
        gold: {
          50: '#FAF6ED',
          100: '#F3EAD3',
          200: '#E7D5AA',
          300: '#DABF7E',
          400: '#CBA758',
          500: '#B69041',
          600: '#947230',
          700: '#755726',
          800: '#5C4321',
          900: '#4B361C',
        },
        ivory: {
          50: '#FCFAF6',
          100: '#F7F3EA',
          200: '#EFE8DA',
          300: '#E2D6C0',
          400: '#CFC0A4',
          500: '#B8A584',
          600: '#9A8768',
          700: '#7A6B53',
          800: '#635744',
          900: '#52483A',
        },
        cedar: {
          50: '#FAF4F0',
          100: '#F4E7DF',
          200: '#E8CEBF',
          300: '#D8AE99',
          400: '#C48A70',
          500: '#A9684C',
          600: '#8E513A',
          700: '#74402F',
          800: '#603629',
          900: '#502F24',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest_luxury: '0.22em',
        ultra: '0.3em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(20, 37, 22, 0.08)',
        'luxury-lg': '0 25px 50px -12px rgba(20, 37, 22, 0.15)',
        'gold-glow': '0 0 25px rgba(203, 167, 88, 0.25)',
      }
    },
  },
  plugins: [],
}
