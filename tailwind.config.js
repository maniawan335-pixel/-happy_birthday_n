/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe0e8',
          200: '#ffc1d1',
          300: '#ff9db6',
          400: '#ff7a9d',
          500: '#f55d84',
        },
        rose: {
          cream: '#fff8f5',
          light: '#fdeef2',
          soft: '#f8d7e3',
          muted: '#e8b4c8',
          dusty: '#c9849a',
          deep: '#a85f7a',
        },
        gold: {
          soft: '#f5d4a0',
          warm: '#e8c07a',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'flame-flicker': 'flameFlicker 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 100, 132, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 100, 132, 0.6)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        flameFlicker: {
          '0%': { transform: 'scaleY(1) skewX(-2deg)' },
          '100%': { transform: 'scaleY(1.1) skewX(2deg)' },
        },
      },
      backgroundImage: {
        'gradient-blush': 'linear-gradient(135deg, #fff5f7 0%, #fdeef2 50%, #fff8f5 100%)',
        'gradient-rose': 'linear-gradient(135deg, #f8d7e3 0%, #fdeef2 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fff5f7 0%, #fdf0e8 100%)',
      },
    },
  },
  plugins: [],
}
