
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // PlayStation Primary Button - Full pill with signature hover
        default: "bg-ps-blue text-white hover:bg-ps-cyan hover:scale-110 hover:border-2 hover:border-white hover:shadow-[0_0_0_2px_#0070cc] rounded-full",
        // PlayStation Commerce Orange Button - For buy-state CTAs
        destructive: "bg-commerce-orange text-white hover:bg-commerce-orange-active hover:scale-110 hover:border-2 hover:border-white hover:shadow-[0_0_0_2px_#0070cc] rounded-full",
        // PlayStation Secondary Button - White outline on dark
        outline: "bg-transparent text-ps-blue border-2 border-ps-blue hover:bg-ps-cyan hover:text-white hover:scale-110 rounded-full",
        // PlayStation Ghost Button - Transparent with subtle border
        secondary: "bg-transparent text-white border-1 border-white/30 hover:bg-white/10 hover:border-white rounded-full",
        // PlayStation Ghost Button - No background
        ghost: "bg-transparent text-white hover:text-ps-cyan hover:bg-white/10 rounded-full",
        // PlayStation Link Button
        link: "text-ps-blue underline-offset-4 hover:text-ps-cyan hover:scale-105",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 py-1.5",
        lg: "h-12 px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
