/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-calm': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-ocean': 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      }
    },
  },
  plugins: [],
}