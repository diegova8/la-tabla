import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

const statusVariants: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  confirmed: "info",
  preparing: "info",
  ready: "success",
  delivered: "success",
  cancelled: "danger",
};

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status] || "default"}>
      {ORDER_STATUS_LABELS[status] || status}
    </Badge>
  );
}
