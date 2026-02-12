import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-stone-500">{title}</p>
          <p className="text-2xl font-bold text-stone-900">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium mt-0.5",
                changeType === "positive" && "text-emerald-600",
                changeType === "negative" && "text-red-600",
                changeType === "neutral" && "text-stone-500"
              )}
            >
              {change}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
