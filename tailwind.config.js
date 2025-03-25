/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1.5s infinite',
        ping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'subtle-attention': 'subtle-attention 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'subtle-attention': {
          '0%, 100%': {
            boxShadow: '0 0 0 rgba(51, 51, 51, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 10px rgba(51, 51, 51, 0.2)',
          },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translate(-50%, 5px)' },
          '100%': { opacity: 1, transform: 'translate(-50%, 0)' },
        },
      },
    },
  },
  plugins: [],
};
