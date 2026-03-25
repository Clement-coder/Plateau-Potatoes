/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        clay: {
          bg: '#e8f0e9',
          green: '#2cb67d',
          'green-dark': '#1a9e68',
          surface: '#f5faf6',
          muted: '#9ca3af',
        },
        primary: {
          50: '#f0f9f0', 100: '#dcf2dc',
          500: '#22c55e', 600: '#16a34a',
          700: '#15803d', 800: '#166534', 900: '#14532d',
        },
      },
      borderRadius: {
        clay: '1.5rem',
      },
      boxShadow: {
        clay: '8px 8px 20px rgba(163,177,198,0.55), -6px -6px 16px rgba(255,255,255,0.85)',
        'clay-sm': '4px 4px 12px rgba(163,177,198,0.45), -3px -3px 8px rgba(255,255,255,0.8)',
        'clay-inset': 'inset 4px 4px 10px rgba(163,177,198,0.5), inset -3px -3px 8px rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
}
