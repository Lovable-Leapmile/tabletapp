import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary button - Uses theme primary color with appropriate text contrast
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-sm",
        
        // Destructive button - Uses theme destructive color
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm",
        
        // Outline button - Border with hover state using theme colors
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground",
        
        // Secondary button - Uses theme secondary colors
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80 shadow-sm",
        
        // Ghost button - Transparent with hover state using theme colors
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
        
        // Link button - Uses theme primary color
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
        
        // Success button - Uses theme success color
        success: "bg-success text-white hover:bg-success/90 active:bg-success/80 shadow-sm",
        
        // Warning button - Uses theme warning color
        warning: "bg-warning text-white hover:bg-warning/90 active:bg-warning/80 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-lg text-base",
        xl: "h-12 px-10 rounded-lg text-lg",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
