import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulsate: {
          '0%, 100%': { scale: '1' },
          '50%': { scale: '1.05' },
        },
        'pulse-2': {
          '0%, 100%': { filter: 'brightness(1.05)' },
          '50%': { filter: 'brightness(1)' },
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
        wiggle: 'wiggle 1s ease-in-out infinite',
        spin: 'spin 3s linear infinite',
        pulsate: 'pulsate 1s ease-in-out infinite',
        'pulse-2': 'pulse-2 2s ease-in-out infinite',
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
  purge: {
    options: {
      safelist: [
        'animate-spin',
        'animate-wiggle',
        'animate-pulse',
        'animate-pulsate',
        'animate-pulse-2',
      ],
    },
  },
};
export default config;
