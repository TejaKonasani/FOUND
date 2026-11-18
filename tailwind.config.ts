import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // FOUND brand palette
        found: {
          rose: '#C64B7A',
          burgundy: '#7B244C',
          pink: '#F47B9A',
          blush: '#FFF0F4',
          ivory: '#FFF9F6',
          champagne: '#F7E8D6',
          lavender: '#EEE6FA',
          plum: '#261B2B',
          gold: '#C9A46A',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
        noto: ['var(--font-noto)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '1.1' }],
        'section': ['clamp(2rem, 3.5vw, 3.5rem)', { lineHeight: '1.2' }],
        'card': ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.3' }],
        'body': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.6' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(123, 36, 76, 0.08)',
        'glow': '0 0 20px -4px rgba(198, 75, 122, 0.3)',
        'card': '0 8px 30px -6px rgba(123, 36, 76, 0.12)',
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #C64B7A 0%, #F47B9A 100%)',
        'gradient-burgundy': 'linear-gradient(135deg, #7B244C 0%, #C64B7A 100%)',
        'gradient-blush': 'linear-gradient(180deg, #FFF0F4 0%, #FFF9F6 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A46A 0%, #F7E8D6 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #EEE6FA 0%, #FFF9F6 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
