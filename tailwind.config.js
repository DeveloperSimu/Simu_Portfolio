/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#080810',
          soft: '#10101C',
          raised: '#161624',
          line: '#26263A',
        },
        violet: {
          DEFAULT: '#A78BFA',
          strong: '#8B5CF6',
          highlight: '#C4B5FD',
          deep: '#5B3FD1',
        },
        cyan: {
          glow: '#67E8F9',
        },
        emerald: {
          glow: '#6EE7B7',
        },
        amber: {
          glow: '#FCD34D',
        },
        rose: {
          glow: '#FDA4AF',
        },
        fg: {
          DEFAULT: '#F8FAFC',
          muted: '#9292A8',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        glow: '0 0 40px rgba(139, 92, 246, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(0, -120px, 0)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        drift: 'drift 12s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s steps(1) infinite',
        orbit: 'orbit 38s linear infinite',
      },
    },
  },
  plugins: [],
};
