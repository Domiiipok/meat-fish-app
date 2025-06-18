export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        primary: '#b91c1c',
        secondary: '#1f2937',
        muted: '#9ca3af',
        background: '#121212',
        text: '#ffffff',
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
