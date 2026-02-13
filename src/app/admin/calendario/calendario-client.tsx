"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, CalendarX, ShoppingCart, Ban } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Price } from "@/components/ui/price";

interface UpcomingOrder {
  deliveryDate: string;
  count: number;
  total: string;
}

interface BlockedDate {
  id: number;
  date: string;
  reason: string | null;
}

interface Order {
  id: number;
  orderNumber: string;
  guestName: string | null;
  status: string;
  deliveryDate: string;
  deliveryMethod: string;
  total: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

export function CalendarioClient({
  upcomingOrders,
  blockedDates,
  recentOrders,
}: {
  upcomingOrders: UpcomingOrder[];
  blockedDates: BlockedDate[];
  recentOrders: Order[];
}) {
  const router = useRouter();
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBlockDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    setLoading(true);
    try {
      const res = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: blockDate, reason: blockReason }),
      });
      if (res.ok) {
        setShowBlockForm(false);
        setBlockDate("");
        setBlockReason("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (id: number) => {
    if (!confirm("¿Desbloquear esta fecha?")) return;
    await fetch(`/api/blocked-dates/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const blockedSet = new Set(blockedDates.map((b) => b.date));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Calendario</Heading>
        <Button variant="gold" onClick={() => setShowBlockForm(true)}>
          <Ban className="h-4 w-4" />
          Bloquear fecha
        </Button>
      </div>

      {/* Block date modal */}
      {showBlockForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              Bloquear fecha
            </h2>
            <form onSubmit={handleBlockDate} className="space-y-4">
              <Input
                label="Fecha"
                type="date"
                required
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
              />
              <Input
                label="Motivo (opcional)"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Ej: Día feriado, vacaciones..."
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <Button type="button" variant="secondary" onClick={() => setShowBlockForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="gold" loading={loading}>
                  Bloquear
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming orders by date */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-stone-900">Próximas entregas</h3>
          </div>
          {upcomingOrders.length === 0 ? (
            <p className="text-sm text-stone-500">No hay pedidos próximos.</p>
          ) : (
            <div className="space-y-3">
              {upcomingOrders.map((day) => (
                <div
                  key={day.deliveryDate}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    blockedSet.has(day.deliveryDate) ? "bg-red-50" : "bg-stone-50"
                  }`}
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {new Date(day.deliveryDate + "T12:00:00").toLocaleDateString("es-CR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    <p className="text-sm text-stone-500">
                      {day.count} pedido{day.count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Price amount={day.total || "0"} size="sm" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Blocked dates */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarX className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-stone-900">Fechas bloqueadas</h3>
          </div>
          {blockedDates.length === 0 ? (
            <p className="text-sm text-stone-500">No hay fechas bloqueadas.</p>
          ) : (
            <div className="space-y-2">
              {blockedDates.map((bd) => (
                <div
                  key={bd.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {new Date(bd.date + "T12:00:00").toLocaleDateString("es-CR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    {bd.reason && (
                      <p className="text-sm text-stone-500">{bd.reason}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleUnblock(bd.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                    title="Desbloquear"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Recent orders list */}
      <Card className="mt-6">
        <div className="p-6 border-b border-stone-200">
          <h3 className="font-semibold text-stone-900">Pedidos próximos</h3>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-6 text-sm text-stone-500">No hay pedidos próximos.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left">
                  <th className="px-6 py-3 font-medium text-stone-500">Pedido</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Cliente</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Fecha entrega</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Método</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Total</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-stone-900">{order.guestName}</td>
                    <td className="px-6 py-4">
                      {new Date(order.deliveryDate + "T12:00:00").toLocaleDateString("es-CR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {order.deliveryMethod === "delivery" ? "Delivery" : "Pick Up"}
                    </td>
                    <td className="px-6 py-4">
                      <Price amount={order.total} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[order.status] || ""}>
                        {statusLabels[order.status] || order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
