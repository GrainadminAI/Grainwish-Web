/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: '#03140c',
          card: '#082317',
          border: '#14452f',
          primary: '#10b981',
          primaryHover: '#059669',
          accent: '#84cc16',
          gold: '#f59e0b',
          goldGlow: '#fbbf24',
          cyan: '#06b6d4',
          neon: '#34d399',
          textMuted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(16, 185, 129, 0.8), 0 0 50px rgba(245, 158, 11, 0.4)' },
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '90%' },
          '100%': { top: '0%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}
