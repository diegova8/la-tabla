import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PriceProps {
  amount: number | string;
  suffix?: string; // "/persona", "c/u"
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-sm",
  md: "text-lg font-semibold",
  lg: "text-2xl font-bold",
} as const;

export function Price({ amount, suffix, size = "md", className }: PriceProps) {
  return (
    <span className={cn("text-stone-900", sizes[size], className)}>
      {formatPrice(amount)}
      {suffix && <span className="text-stone-500 font-normal text-sm ml-1">{suffix}</span>}
    </span>
  );
}
