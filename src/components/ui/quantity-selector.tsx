"use client";

import { Minus, Plus } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 border border-stone-200 rounded-md", className)}>
      <IconButton
        label="Disminuir cantidad"
        size="sm"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </IconButton>
      <span className="w-10 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <IconButton
        label="Aumentar cantidad"
        size="sm"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
