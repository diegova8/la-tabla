import type { HTMLAttributes } from "react";
import { createElement } from "react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4;

const styles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900",
  2: "text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900",
  3: "text-xl sm:text-2xl font-serif font-semibold text-stone-900",
  4: "text-lg font-semibold text-stone-800",
};

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: `h${Level}`;
}

export function Heading({
  level = 2,
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const tag = as || `h${level}`;
  return createElement(tag, { className: cn(styles[level], className), ...props }, children);
}
