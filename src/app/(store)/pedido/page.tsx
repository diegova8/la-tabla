"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, Package, Truck, CheckCircle, Clock, ChefHat, XCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: any; step: number }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock, step: 0 },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800", icon: CheckCircle, step: 1 },
  preparing: { label: "Preparando", color: "bg-orange-100 text-orange-800", icon: ChefHat, step: 2 },
  ready: { label: "Listo", color: "bg-green-100 text-green-800", icon: Package, step: 3 },
  delivered: { label: "Entregado", color: "bg-emerald-100 text-emerald-800", icon: Truck, step: 4 },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle, step: -1 },
};

const steps = ["Pendiente", "Confirmado", "Preparando", "Listo", "Entregado"];

interface OrderData {
  orderNumber: string;
  status: string;
  guestName: string;
  deliveryMethod: string;
  deliveryDate: string;
  deliveryAddress: string | null;
  deliverySlot: string | null;
  subtotal: string;
  deliveryCost: string;
  total: string;
  paymentMethod: string | null;
  paymentStatus: string | null;
  notes: string | null;
  createdAt: string;
  items: {
    id: number;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    notes: string | null;
    productName: string;
    productImage: string | null;
  }[];
}

export default function PedidoTrackingPage() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const n = searchParams.get("n");
    if (n) {
      setOrderNumber(n);
      fetchOrder(n);
    }
  }, [searchParams]);

  const fetchOrder = async (num: string) => {
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(num.trim())}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Pedido no encontrado");
        return;
      }
      setOrder(await res.json());
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    fetchOrder(orderNumber);
  };

  const config = order ? statusConfig[order.status] || statusConfig.pending : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Heading level={1}>Seguí tu Pedido</Heading>
              <p className="mt-2 text-stone-600">
                Ingresá tu número de pedido para ver el estado.
              </p>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-10">
              <Input
                placeholder="Ej: LT-260213-ABCD"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button type="submit" variant="gold" loading={loading}>
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </form>

            {error && (
              <Card className="p-6 text-center">
                <XCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
                <p className="text-stone-700">{error}</p>
              </Card>
            )}

            {order && config && (
              <div className="space-y-6">
                {/* Status header */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-stone-500">Pedido</p>
                      <p className="text-xl font-bold text-stone-900 font-mono">
                        {order.orderNumber}
                      </p>
                    </div>
                    <Badge className={config.color}>
                      <config.icon className="h-3.5 w-3.5 mr-1" />
                      {config.label}
                    </Badge>
                  </div>

                  {/* Progress bar */}
                  {config.step >= 0 && (
                    <div className="mb-2">
                      <div className="flex justify-between mb-2">
                        {steps.map((step, i) => (
                          <span
                            key={step}
                            className={`text-xs font-medium ${
                              i <= config.step ? "text-amber-700" : "text-stone-400"
                            }`}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full transition-all duration-500"
                          style={{ width: `${(config.step / (steps.length - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Card>

                {/* Items */}
                <Card className="p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">Productos</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-stone-100 shrink-0">
                          {item.productImage ? (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-lg">🧀</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-900 truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-stone-500">
                            Cant: {item.quantity}
                          </p>
                        </div>
                        <Price amount={item.totalPrice} size="sm" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between">
                    <span className="font-semibold text-stone-900">Total</span>
                    <Price amount={order.total} size="md" />
                  </div>
                </Card>

                {/* Delivery info */}
                <Card className="p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">Entrega</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Método</dt>
                      <dd className="text-stone-900">
                        {order.deliveryMethod === "delivery" ? "Delivery" : "Pick Up"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Fecha</dt>
                      <dd className="text-stone-900">{order.deliveryDate}</dd>
                    </div>
                    {order.deliverySlot && (
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Horario</dt>
                        <dd className="text-stone-900">{order.deliverySlot}</dd>
                      </div>
                    )}
                    {order.deliveryAddress && (
                      <div className="flex justify-between">
                        <dt className="text-stone-500">Dirección</dt>
                        <dd className="text-stone-900 text-right max-w-[60%]">
                          {order.deliveryAddress}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-stone-500">Pago</dt>
                      <dd className="text-stone-900">
                        {order.paymentMethod === "sinpe" ? "Sinpe Móvil" : "Transferencia"}
                        {" · "}
                        <span className={order.paymentStatus === "verified" ? "text-green-600" : "text-yellow-600"}>
                          {order.paymentStatus === "verified" ? "Verificado" : "Pendiente"}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
