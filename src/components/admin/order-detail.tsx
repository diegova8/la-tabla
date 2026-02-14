"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusOptions = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "preparing", label: "Preparando" },
  { value: "ready", label: "Listo" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

const statusVariant: Record<string, "default" | "warning" | "success" | "danger" | "info"> = {
  pending: "warning",
  confirmed: "info",
  preparing: "info",
  ready: "success",
  delivered: "success",
  cancelled: "danger",
};

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  notes: string | null;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  deliveryMethod: string;
  deliveryDate: string;
  deliveryAddress: string | null;
  total: string;
  notes: string | null;
  items?: OrderItem[];
}

export function OrderDetail({ order: initialOrder }: { order: Order }) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [items, setItems] = useState<OrderItem[]>(initialOrder.items || []);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const loadItems = async () => {
    if (items.length > 0) {
      setExpanded(!expanded);
      return;
    }
    try {
      const res = await fetch(`/api/orders/${order.id}`);
      const data = await res.json();
      setItems(data.items || []);
      setExpanded(true);
    } catch {
      // silently fail — admin can retry
    }
  };

  const updateStatus = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrder((prev) => ({ ...prev, status: data.status }));
        router.refresh();
      }
    } catch {
      // silently fail — admin can retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={loadItems} className="font-medium text-amber-800 hover:underline">
            {order.orderNumber}
          </button>
          <span className="ml-3 text-sm text-stone-500">
            {order.guestName} · {order.deliveryDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-900">${order.total}</span>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={loading}
            className="text-xs rounded-md border border-stone-300 px-2 py-1 bg-white"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {expanded && items.length > 0 && (
        <div className="mt-2 pl-4 border-l-2 border-stone-200 space-y-1">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-stone-600">
              <span>{item.quantity}x {item.productName}</span>
              <span>${item.totalPrice}</span>
            </div>
          ))}
          {order.notes && (
            <p className="text-xs text-stone-400 mt-2">Notas: {order.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}
