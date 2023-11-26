import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {CircleIcon} from '@radix-ui/react-icons'
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "shadow-md inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        danger:
          "bg-red-600 text-primary-foreground hover:bg-red-700",
        success:
          "bg-green-600 text-primary-foreground hover:bg-green-700",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean,
    loading?: boolean,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading=false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
          disabled={loading}
          className={cn(buttonVariants({ variant, size, className}), loading?'opacity-80':'')}
          ref={ref}
          {...props}
      >
          {loading ? <CircleIcon className={'mr-1'}/> : ''}
          {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
