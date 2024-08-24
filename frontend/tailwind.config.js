/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        cta: 'var(--cta)',
        'cta-hover': 'var(--cta-hover)',
        'cta-sidebar': 'var(--cta-sidebar)',
      },
      fontFamily: {
        sans: ['DM Sans'],
      },
    },
  },
  plugins: [],
};
