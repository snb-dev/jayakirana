import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F36B21',
          'orange-dark': '#D95312',
          dark: '#17201A',
        },
        accent: {
          yellow: '#FBBF24',
        },
        ink: {
          primary: '#18201B',
          secondary: '#667069',
        },
        success: '#16A34A',
        border: '#E5E0D7',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        page: '#F7F4EE',
      },
      boxShadow: {
        card: '0 2px 10px rgba(23, 32, 26, 0.055)',
        'card-hover': '0 18px 42px rgba(23, 32, 26, 0.13)',
        nav: '0 6px 24px rgba(8, 12, 9, 0.18)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceBadge: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        saleFlash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        popCheck: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        drawerIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out',
        'bounce-badge': 'bounceBadge 0.5s ease-out',
        floaty: 'floaty 4s ease-in-out infinite',
        'floaty-slow': 'floaty 5.5s ease-in-out infinite',
        'sale-flash': 'saleFlash 1.2s ease-in-out infinite',
        'pop-check': 'popCheck 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'drawer-in': 'drawerIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
