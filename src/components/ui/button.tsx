import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usvc-blue focus-visible:ring-offset-2 active:scale-[0.95] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Apple-style primary pill — blue capsule for main CTA
        default: "bg-usvc-blue text-white hover:bg-ps-blue rounded-full",
        // Navy utility rect — for secondary / dark-surface CTAs
        navy: "bg-usvc-navy text-white hover:bg-usvc-blue rounded-[8px]",
        // Apple-style secondary pill — ghost blue with 1px border
        pillGhost:
          "bg-transparent border border-usvc-blue text-usvc-blue hover:bg-usvc-blue hover:text-white rounded-full",
        // Light / secondary option
        secondary:
          "bg-[#f2f3f9] text-usvc-navy hover:bg-usvc-blue hover:text-white rounded-[8px]",
        // Ghost rectangle with hairline border
        outline:
          "bg-transparent border border-usvc-border text-usvc-navy hover:bg-usvc-blue hover:text-white hover:border-usvc-blue rounded-[8px]",
        // Destructive
        destructive:
          "bg-commerce-orange text-white hover:bg-commerce-orange-active rounded-full",
        // Ghost on dark surfaces
        ghost:
          "bg-transparent text-white hover:text-usvc-blue hover:bg-white/10 rounded-[8px]",
        // Link
        link: "text-usvc-blue underline-offset-4 hover:text-ps-cyan",
      },
      size: {
        default: "h-11 px-7 py-2 text-[0.95rem]",
        sm: "h-9 px-4 py-1.5",
        lg: "h-12 px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
