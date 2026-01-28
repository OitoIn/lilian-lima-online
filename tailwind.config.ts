import type { Config } from "tailwindcss";

// Golden Ratio (φ) constants
const PHI = 1.61803398875;
const PHI_INV = 0.61803398875;

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.618rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors
        olive: {
          DEFAULT: "hsl(var(--olive))",
          light: "hsl(var(--olive-light))",
          dark: "hsl(var(--olive-dark))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
        warm: {
          white: "hsl(var(--warm-white))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Lora', 'Georgia', 'serif'],
      },
      // Golden Ratio Typography Scale (φ = 1.618)
      fontSize: {
        'phi-xs': ['0.618rem', { lineHeight: '1.5' }],
        'phi-sm': ['0.786rem', { lineHeight: '1.5' }],
        'phi-base': ['1rem', { lineHeight: '1.55' }],
        'phi-md': ['1.272rem', { lineHeight: '1.5' }],
        'phi-lg': ['1.618rem', { lineHeight: '1.25' }],
        'phi-xl': ['2.058rem', { lineHeight: '1.25' }],
        'phi-2xl': ['2.618rem', { lineHeight: '1.25' }],
        'phi-3xl': ['4.236rem', { lineHeight: '1.15' }],
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      // Golden Ratio Spacing Scale
      spacing: {
        'phi-1': '0.618rem',
        'phi-2': '1rem',
        'phi-3': '1.618rem',
        'phi-4': '2.618rem',
        'phi-5': '4.236rem',
        'phi-6': '6.854rem',
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Golden Ratio based gaps
      gap: {
        'phi-1': '0.618rem',
        'phi-2': '1rem',
        'phi-3': '1.618rem',
        'phi-4': '2.618rem',
        'phi-5': '4.236rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'card': 'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)',
      },
      // Golden Ratio Aspect Ratios
      aspectRatio: {
        'phi': '1.618 / 1',
        'phi-portrait': '1 / 1.618',
      },
      // Grid template columns with φ
      gridTemplateColumns: {
        'phi': '0.618fr 0.382fr',
        'phi-reverse': '0.382fr 0.618fr',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
