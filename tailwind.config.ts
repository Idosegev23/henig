import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // צבעי מותג מכון הניג - תמה חדשה
        primary: {
          50: '#e6f7f0',
          100: '#cceed1',
          200: '#99dda3',
          300: '#66cc75',
          400: '#33bb47',
          500: '#027333', // ירוק כהה עיקרי
          600: '#025c29',
          700: '#01451f',
          800: '#012e15',
          900: '#00170a',
        },
        secondary: {
          50: '#e6fdf2',
          100: '#ccfce5',
          200: '#99f9cb',
          300: '#66f6b1',
          400: '#33f397',
          500: '#29D967', // ירוק בהיר
          600: '#21ad52',
          700: '#19813d',
          800: '#115628',
          900: '#082a14',
        },
        accent: {
          50: '#f2fcfe',
          100: '#e6f9fd',
          200: '#ccf3fa',
          300: '#9CCED9', // תכלת רך
          400: '#7ab8c5',
          500: '#58a2b1',
          600: '#46829e',
          700: '#34618a',
          800: '#224177',
          900: '#112063',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#F2F2F2', // רקע עיקרי
          200: '#e6e6e6',
          300: '#cccccc',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#142B40', // כהה עיקרי
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        hebrew: ['Heebo', 'Assistant', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #027333 0%, #29D967 100%)',
        'gradient-hero': 'linear-gradient(135deg, #142B40 0%, #027333 100%)',
        'gradient-soft': 'linear-gradient(135deg, #29D967 0%, #9CCED9 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient': 'gradient 8s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-vertical': 'marquee-vertical 25s linear infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        shimmer: {
          '0%': {
            'background-position': '-200% 0',
          },
          '100%': {
            'background-position': '200% 0',
          },
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(3, 110, 58, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
