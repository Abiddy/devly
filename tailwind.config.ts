import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        obsidian: '#08080a',
        onyx: '#040406',
        carbon: '#121317',
        graphite: '#1c1d22',
        slate: '#2e3038',
        steel: '#777a88',
        fog: '#9194a1',
        mist: '#acafb9',
        bone: '#e2e3e9',
        'paper-white': '#ffffff',
        copper: '#cc9166',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '1216px',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
