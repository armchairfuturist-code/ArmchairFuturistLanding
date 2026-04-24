
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        heading: ['Arial', 'Helvetica', 'sans-serif'],
        display: ['Arial', 'Helvetica', 'sans-serif'],
        body: ['Arial', 'Helvetica', 'sans-serif'],
        ui: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
  		colors: {
        // PlayStation Design Colors
        'ps-blue': '#0070cc',
        'ps-cyan': '#1eaedb',
        'commerce-orange': '#d53b00',
        'commerce-orange-active': '#aa2f00',
        'paper-white': '#ffffff',
        'ice-mist': '#f5f7fa',
        'divider-tint': '#f3f3f3',
        'masthead-black': '#000000',
        'shadow-black': '#121314',
        'display-ink': '#000000',
        'deep-charcoal': '#1f1f1f',
        'body-gray': '#6b6b6b',
        'mute-gray': '#cccccc',
        'inverse-white': '#ffffff',
        'dark-link-blue': '#53b1ff',
        'link-hover-blue': '#1883fd',
        'dark-link-blue-rest': '#0068bd',
        'warning-red': '#c81b3a',
        
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        'hero-title-1': 'hsl(var(--hero-title-color-1))',
        'hero-title-2': 'hsl(var(--hero-title-color-2))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
        sectionBlue: 'hsl(var(--section-blue-background))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
      typography: ((theme: (name: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.wired-black'),
            fontFamily: theme('fontFamily.body'),
          },
        },
      })),
  		borderRadius: {
        // PlayStation border radius scale
        'ps-xs': '2px',
        'ps-sm': '3px',
        'ps-md': '6px',
        'ps-lg': '12px',
        'ps-xl': '13px',
        'ps-2xl': '19px',
        'ps-3xl': '20px',
        'ps-4xl': '24px',
        'ps-5xl': '36px',
        'ps-6xl': '48px',
        'ps-pill': '999px',
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
        'none': '0',
        'square': '0',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration, 25s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 25s) linear infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
