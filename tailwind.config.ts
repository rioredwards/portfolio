import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'animate-spin',
    'animate-intermittent-spin',
    'animate-wiggle',
    'animate-intermittent-wiggle',
    'animate-pulse',
    'animate-pulsate',
    'animate-pulse-2',
    'animate-pulse-3',
  ],
  theme: {
    extend: {
      spacing: {
        '100': '28rem',
        '112': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'intermittent-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '60%': { transform: 'rotate(-4deg)' },
          '70%': { transform: 'rotate(3deg)' },
          '80%': { transform: 'rotate(-2deg)' },
          '90%': { transform: 'rotate(1deg)' },
        },
        'intermittent-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '55%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulsate: {
          '0%, 100%': { scale: '1' },
          '50%': { scale: '1.05' },
        },
        'pulse-2': {
          '0%, 100%': { filter: 'brightness(1.05)' },
          '50%': { filter: 'brightness(1)' },
        },
        'pulse-3': {
          '0%, 100%': { backdropFilter: 'saturate(300%) brightness(1.1) hue-rotate(60deg)' },
          '25%': { backdropFilter: 'saturate(100%)' },
          '50%': { backdropFilter: 'saturate(300%) hue-rotate(30deg)' },
          '75%': { backdropFilter: 'saturate(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '1r': '1rem',
        '2r': '2rem',
        '3r': '3rem',
      },
      borderRadius: {
        '4xl': '3rem',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      animation: {
        'intermittent-wiggle': 'intermittent-wiggle 5s ease-in-out infinite',
        'intermittent-spin': 'intermittent-spin 5s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        spin: 'spin 3s linear infinite',
        pulsate: 'pulsate 1s ease-in-out infinite',
        'pulse-2': 'pulse-2 2s ease-in-out infinite',
        'pulse-3': 'pulse-3 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
export default config;
