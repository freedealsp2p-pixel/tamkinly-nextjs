import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Universal button variants that work on ALL backgrounds
// Rule: Every button MUST have visible text with high contrast
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Primary - Dark button with white text (works everywhere)
        default:
          "bg-[#0F1C2E] text-white shadow-lg hover:bg-[#1a2d47] hover:shadow-xl active:scale-[0.98]",

        // Accent - Green button with dark text (high contrast)
        accent:
          "bg-[#3DD4B0] text-[#0F1C2E] shadow-lg hover:bg-[#2BC49E] hover:shadow-xl active:scale-[0.98]",

        // Secondary - Teal button with white text
        secondary:
          "bg-[#1F6F78] text-white shadow-lg hover:bg-[#2a8a94] hover:shadow-xl active:scale-[0.98]",

        // Destructive - Red button with white text
        destructive:
          "bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl active:scale-[0.98]",

        // Outline - Dark border with dark text (works on light AND dark backgrounds)
        outline:
          "border-2 border-[#0F1C2E] bg-transparent text-[#0F1C2E] shadow-sm hover:bg-[#0F1C2E] hover:text-white active:scale-[0.98]",

        // Ghost - Subtle button with dark text
        ghost:
          "bg-transparent text-[#0F1C2E] hover:bg-slate-100 active:scale-[0.98]",

        // Link - Text link style
        link: "text-[#1F6F78] underline-offset-4 hover:underline",

        // Premium - Gradient button
        premium:
          "bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] text-white shadow-lg hover:from-[#1a2d47] hover:to-[#2a8a94] hover:shadow-xl active:scale-[0.98]",

        // White - White button with dark text (for dark backgrounds)
        white:
          "bg-white text-[#0F1C2E] shadow-lg hover:bg-slate-50 hover:shadow-xl active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
