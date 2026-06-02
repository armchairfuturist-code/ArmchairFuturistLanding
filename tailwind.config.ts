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
        // Display: Space Grotesk (Google Fonts) — geometric sans, single-story 'a'
        // Body/UI: Manrope (Google Fonts) — neutral, high readability
        display: ['var(--font-display)', '"Space Grotesk"', '"Manrope"', "system-ui", "sans-serif"],
        sans: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
        heading: ['var(--font-display)', '"Space Grotesk"', '"Manrope"', "system-ui", "sans-serif"],
        body: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
        ui: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier New"', "Courier", "monospace"],
      },
      letterSpacing: {
        // HP button signature: uppercase +0.7px tracking
        "hp-button": "0.7px",
        "hp-button-sm": "0.126px",
        "hp-flat": "0",
      },
      colors: {
        // === HP COLOR SYSTEM ===

        // Brand — Electric Blue system
        "hp-electric": "#024ad8", // Primary CTA, links, focus
        "hp-bright": "#296ef9", // Hover on primary
        "hp-deep": "#0e3191", // Pressed, dark borders
        "hp-soft": "#c9e0fc", // Tinted blue surfaces

        // Ink (text)
        ink: "#1a1a1a", // Display headlines, primary text
        "ink-deep": "#000000", // Hero overlay, absolute contrast
        "ink-soft": "#292929", // Secondary body, dense text

        // Surfaces
        canvas: "#ffffff", // Page background
        cloud: "#f7f7f7", // Card backgrounds, soft sections
        fog: "#e8e8e8", // Hairline dividers
        steel: "#c2c2c2", // Disabled, placeholder
        graphite: "#636363", // Secondary metadata
        charcoal: "#3d3d3d", // Strong secondary text

        // Hairlines
        hairline: "#e8e8e8", // Light dividers
        "hairline-strong": "#c2c2c2", // Strong 1px borders

        // Accent library (reserved)
        "bloom-coral": "#ff5050", // Sale urgency
        "bloom-rose": "#f9d4d2", // Soft coral
        "bloom-deep": "#b3262b", // Error, destructive
        "bloom-wine": "#5a1313", // Error text
        "storm-mist": "#8ebdce", // Cool photo frame
        "storm-sea": "#7fadbe", // Cool photo frame
        "storm-deep": "#356373", // Cool photo frame

        // Legacy aliases (mapped to HP tokens for backward compat)
        "usvc-blue": "#024ad8", // → hp-electric
        "ps-blue": "#0e3191", // → hp-deep
        "usvc-navy": "#1a1a1a", // → ink
        "ps-cyan": "#296ef9", // → hp-bright
        "usvc-off-white": "#ffffff", // → canvas
        "usvc-border": "#e8e8e8", // → hairline
        "border-dark": "#0e3191", // → hp-deep

        "paper-white": "#ffffff", // → canvas
        "console-black": "#000000", // → ink-deep
        "shadow-black": "#1a1a1a", // → ink
        "ink-navy": "#1a1a1a", // → ink

        "display-ink": "#1a1a1a", // → ink
        "deep-charcoal": "#1a1a1a", // → ink
        "body-gray": "#636363", // → graphite
        "mute-gray": "#9ca3af", // → lighter neutral
        "inverse-white": "#ffffff", // → canvas
        "dark-link-blue-rest": "#024ad8", // → hp-electric
        "link-hover-blue": "#296ef9", // → hp-bright
        "dark-link-blue": "#53b1ff", // bright link on dark

        "warning-red": "#b3262b", // → bloom-deep
        "success-green": "#38a169",
        "commerce-orange": "#d53b00",
        "commerce-orange-active": "#aa2f00",

        "card-caption-text": "#024ad8", // → hp-electric

        "ice-mist": "#f7f7f7", // → cloud
        "masthead-black": "#000000", // → ink-deep

        // Shadcn/ui CSS variable colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "hero-title-1": "hsl(var(--hero-title-color-1))",
        "hero-title-2": "hsl(var(--hero-title-color-2))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        sectionBlue: "hsl(var(--section-blue-background))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
      borderRadius: {
        // HP radius system — two anchors: 4px on buttons/inputs, 16px on cards/photos
        "hp-xs": "2px", // micro UI
        "hp-sm": "3px", // sale badges
        "hp-md": "4px", // buttons, inputs (anchor)
        "hp-lg": "8px", // pill badges
        "hp-xl": "16px", // cards, photo frames (anchor)
        "hp-pill": "9999px", // category tabs
        "hp-full": "9999px", // avatars

        // Legacy aliases (mapped to HP tokens for backward compat)
        "usvc-sm": "4px", // → hp-md
        "usvc-md": "8px", // → hp-lg
        "usvc-lg": "12px",
        "usvc-xl": "16px", // → hp-xl
        "ps-pill": "9999px", // → hp-pill
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0",
        square: "0",
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "underline-in": {
          from: { transform: "scaleX(0)", "transform-origin": "0 50%" },
          to: { transform: "scaleX(1)", "transform-origin": "0 50%" },
        },
        "underline-out": {
          from: { transform: "scaleX(1)", "transform-origin": "0 50%" },
          to: { transform: "scaleX(0)", "transform-origin": "100% 50%" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration, 25s) linear infinite",
        "marquee-vertical":
          "marquee-vertical var(--duration, 25s) linear infinite",
        "underline-in":
          "underline-in 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards",
        "underline-out":
          "underline-out 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards",
        "fade-up": "fade-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
