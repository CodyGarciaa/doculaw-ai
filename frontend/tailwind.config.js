/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef7ff',
          100: '#feeafe',
          200: '#fdd5fc',
          300: '#fbb5f8',
          400: '#f785f1',
          500: '#f055e7',
          600: '#d936ce',
          700: '#b422a7',
          800: '#941e87',
          900: '#7a1c6d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'legal': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
} 