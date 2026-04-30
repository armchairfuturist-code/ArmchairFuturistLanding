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
        // Display: system-ui → SF Pro on Apple, Inter substitute on other platforms
        display: ["system-ui", "-apple-system", "sans-serif"],
        // Sans/body: Inter (Google Fonts) as SF Pro substitute
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["system-ui", "-apple-system", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        ui: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier New"', "Courier", "monospace"],
      },
      letterSpacing: {
        // Apple display tracking: negative at display sizes
        "apple-tight": "-0.02em",
        "apple-display": "-0.015em",
        "apple-caption": "0.06em",
      },
      colors: {
        // === MERGED PALETTE: PlayStation + USVC ===

        // Brand Anchors
        "usvc-blue": "#0d84ff", // Primary accent — hover states, links, labels
        "ps-blue": "#0070cc", // Secondary anchor — footer, secondary fills
        "usvc-navy": "#00172e", // Dark surface anchor — sections, footer, cards
        "ps-cyan": "#1eaedb", // Interaction color — hover/focus only

        // Surfaces
        "usvc-off-white": "#fafdff", // Primary canvas — warm paper-like background
        "paper-white": "#ffffff", // Pure white for cards and high-contrast zones
        "console-black": "#000000", // Pure black for hero (PlayStation legacy)
        "shadow-black": "#121314", // Dark section gradient start
        "ink-navy": "#00172e", // USVC navy (alias for usvc-navy)

        // Structural
        "usvc-border": "#b2d5ff", // Borders, dividers, structural lines
        "border-subtle": "rgba(0, 116, 255, 0.32)", // Vertical border lines
        "border-dark": "#143d8d", // Borders on dark navy surfaces
        "divider-tint": "#f3f3f3", // Light horizontal rules

        // Text
        "display-ink": "#00172e", // Display headlines on light surfaces
        "deep-charcoal": "#1f1f1f", // Body headlines
        "body-gray": "#6b6b6b", // Secondary body text
        "mute-gray": "#9ca3af", // Tertiary labels, disabled
        "inverse-white": "#ffffff", // Text on dark surfaces
        "dark-link-blue-rest": "#0068bd", // Link at rest on light
        "link-hover-blue": "#1883fd", // Link hover
        "dark-link-blue": "#53b1ff", // Link on dark surfaces

        // Semantic
        "warning-red": "#e53e3e", // Form errors
        "success-green": "#38a169", // Success states
        "commerce-orange": "#d53b00", // Commerce CTA (PlayStation legacy)
        "commerce-orange-active": "#aa2f00",

        // Card captions
        "card-caption-text": "#0e72da",

        // Utility / Legacy
        "ice-mist": "#f5f7fa",
        "masthead-black": "#000000",

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
        // Merged radius scale
        "usvc-sm": "4px", // Compact buttons, small UI
        "usvc-md": "8px", // Primary buttons, standard cards
        "usvc-lg": "12px", // Feature cards, content images
        "usvc-xl": "24px", // Hero cards, feature frames
        "ps-pill": "999px", // PlayStation pill buttons
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
        // USVC-style underline animation
        "underline-in": {
          from: { transform: "scaleX(0)", "transform-origin": "0 50%" },
          to: { transform: "scaleX(1)", "transform-origin": "0 50%" },
        },
        "underline-out": {
          from: { transform: "scaleX(1)", "transform-origin": "0 50%" },
          to: { transform: "scaleX(0)", "transform-origin": "100% 50%" },
        },
        // Fade + slide for section reveals
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
