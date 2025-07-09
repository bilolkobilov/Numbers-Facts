/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
      'display': ['Manrope', 'system-ui', 'sans-serif'],
      'body': ['Inter', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        'brand': {
          50: '#E6F2FF',
          100: '#B3DFFF',
          200: '#80CCFF',
          300: '#4DB8FF',
          400: '#1AA5FF',
          500: '#0091E6',
          600: '#007ACC',
          700: '#005C99',
          800: '#004466',
          900: '#002D44'
        },
        'accent': {
          50: '#E6F5EA',
          100: '#C2E6C7',
          200: '#9AD7A3',
          300: '#72C87E',
          400: '#4CB95A',
          500: '#2AAF3F',
          600: '#239E36',
          700: '#1A8C2C',
          800: '#117B22',
          900: '#086A18'
        },
        'gradient': {
          start: '#0091E6',
          end: '#2AAF3F'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0091E6 0%, #2AAF3F 100%)',
      },
      boxShadow: {
        'card': '0 15px 30px rgba(0, 145, 230, 0.1)',
        'navbar': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 15px rgba(0, 145, 230, 0.2)'
      },
      borderRadius: {
        'card': '16px',
        'button': '12px'
      },
      animation: {
        'subtle-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ],
}