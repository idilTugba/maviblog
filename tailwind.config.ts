import type { Config } from 'tailwindcss';

const path = require('path');

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        chomsky: ['Chomsky', 'serif'],
      },
      colors: {
        primary: {
          light: '#fbfff4',
          lightsecond: '#dfe3d8',
          DEFAULT: '#1a73e8',
          dark: '#0e1514',
          darksecond: '#384241',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  plugins: [],
};
export default config;
