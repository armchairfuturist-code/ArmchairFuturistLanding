import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.7px] ring-offset-background transition-[background-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric focus-visible:ring-offset-2 active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Apple-style primary pill — blue capsule for main CTA
        default: "bg-hp-electric text-white hover:bg-hp-bright rounded-md",
        // Deep-blue utility rect — for secondary / dark-surface CTAs
        navy: "bg-hp-deep text-white hover:bg-hp-electric rounded-[8px]",
        // Apple-style secondary pill — ghost blue with 1px border
        pillGhost:
          "bg-transparent border border-hp-electric text-hp-electric hover:bg-hp-electric hover:text-white rounded-md",
        // Light / secondary option
        secondary:
          "bg-[#f2f3f9] text-ink hover:bg-hp-electric hover:text-white rounded-[8px]",
        // Ghost rectangle with hairline border
        outline:
          "bg-transparent border border-hairline text-ink hover:bg-hp-electric hover:text-white hover:border-hp-electric rounded-[8px]",
        // Destructive
        destructive:
          "bg-hp-electric text-white hover:bg-hp-deep rounded-md",
        // Ghost on dark surfaces
        ghost:
          "bg-transparent text-white hover:text-hp-electric hover:bg-white/10 rounded-[8px]",
        // Link
        link: "text-hp-electric underline-offset-4 hover:text-hp-bright",
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
