/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: '#000000',
          panel: '#0d1117',
          cyan: '#00f0ff',
          magenta: '#ff007f',
          amber: '#ff3b30',
          textMain: '#f0f4ff',
          textMuted: '#8b9bb4'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
