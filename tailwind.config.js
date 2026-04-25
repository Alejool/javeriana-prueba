/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef3f9',
          100: '#dce7f3',
          200: '#b9cfe7',
          300: '#97b7db',
          400: '#749fcf',
          500: '#2C5697',
          600: '#234579',
          700: '#1a345b',
          800: '#12233c',
          900: '#09111e',
          DEFAULT: '#2C5697',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fff6d6',
          200: '#ffedad',
          300: '#ffe485',
          400: '#ffdb5c',
          500: '#ffc107',
          600: '#dba607ff',
          700: '#997e00',
          800: '#665400',
          900: '#332a00',
          DEFAULT: '#ffc107',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          950: '#0a0e1a',
          DEFAULT: '#F8F9FA',
        },
      },
      
      fontFamily: {
        headline: ['Noto Serif', 'Georgia', 'serif'],
        body: ['Public Sans', 'system-ui', 'sans-serif'],
        label: ['Public Sans', 'system-ui', 'sans-serif'],
      },
      
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
