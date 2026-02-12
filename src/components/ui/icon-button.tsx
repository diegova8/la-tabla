import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // a11y
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-stone-600 transition-colors",
        "hover:bg-stone-100 hover:text-stone-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400",
        "disabled:pointer-events-none disabled:opacity-50",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

IconButton.displayName = "IconButton";
