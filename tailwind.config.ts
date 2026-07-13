import type { Config } from "tailwindcss";

export default {
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
        // Colors expressed in OKLCH (better-colors skill): perceptually
        // uniform, stable hue across lightness, constant-chroma ramps.

        // Brand — Electric Blue system
        "hp-electric": "oklch(51.6% 0.243 264.05)", // #024ad8 — Primary CTA, links, focus
        "hp-bright": "oklch(63.6% 0.207 259.82)", // #296ef9 — Hover on primary
        "hp-deep": "oklch(41.4% 0.169 264.4)", // #0e3191 — Pressed, dark borders
        "hp-soft": "oklch(91.4% 0.048 258.4)", // #c9e0fc — Tinted blue surfaces

        // Ink (text)
        ink: "oklch(17.5% 0 0)", // #1a1a1a — Display headlines, primary text
        "ink-deep": "oklch(0% 0 0)", // #000000 — Hero overlay, absolute contrast
        "ink-soft": "oklch(22.5% 0 0)", // #292929 — Secondary body, dense text

        // Surfaces
        canvas: "oklch(100% 0 0)", // #ffffff — Page background
        cloud: "oklch(97.1% 0 0)", // #f7f7f7 — Card backgrounds, soft sections
        fog: "oklch(91.1% 0 0)", // #e8e8e8 — Hairline dividers
        steel: "oklch(76.1% 0 0)", // #c2c2c2 — Disabled, placeholder
        graphite: "oklch(38.9% 0 0)", // #636363 — Secondary metadata
        charcoal: "oklch(24.1% 0 0)", // #3d3d3d — Strong secondary text

        // Hairlines
        hairline: "oklch(91.1% 0 0)", // #e8e8e8 — Light dividers
        "hairline-strong": "oklch(76.1% 0 0)", // #c2c2c2 — Strong 1px borders

        // Accent library (reserved)
        "bloom-coral": "oklch(68.5% 0.217 12.6)", // #ff5050 — Sale urgency
        "bloom-rose": "oklch(89.9% 0.044 16.5)", // #f9d4d2 — Soft coral
        "bloom-deep": "oklch(43.4% 0.183 27.5)", // #b3262b — Error, destructive
        "bloom-wine": "oklch(22.2% 0.108 18.4)", // #5a1313 — Error text
        "storm-mist": "oklch(80.3% 0.047 213.2)", // #8ebdce — Cool photo frame
        "storm-sea": "oklch(71.4% 0.055 220.5)", // #7fadbe — Cool photo frame
        "storm-deep": "oklch(46.2% 0.062 224.3)", // #356373 — Cool photo frame

        // Semantic surfaces (HP paper = off-white soft section background)
        paper: "#f7f7f7",

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
