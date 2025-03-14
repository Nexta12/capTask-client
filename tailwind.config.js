/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Gilda Display',
      secondary: 'Barlow',
      tertiary: 'Barlow Condensed',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1140px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: {
          DEFAULT: '#172554',
          hover: '#0284C7',
        },
      },
      backgroundImage: {
        room: "url('./assets/img/room.jpg')",
      },
    
      keyframes: {
        bubble: {
          '0%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { opacity: '0.75' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
      },
      animation: {
        bubble: 'bubble linear infinite',
      },
    },
  },
  plugins: [],
}

