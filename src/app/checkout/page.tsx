"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CartSummary } from "@/components/cart/cart-summary";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCartStore } from "@/store/cart-store";
import { MIN_ORDER_DAYS_AHEAD } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<{ id: number; label: string }[]>([]);

  useEffect(() => {
    fetch("/api/delivery-slots")
      .then((r) => r.json())
      .then((data) => setSlots(data))
      .catch(console.error);
  }, []);

  // Calculate min date (today + 2 days)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + MIN_ORDER_DAYS_AHEAD);
  const minDateStr = minDate.toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "delivery",
    deliveryDate: "",
    deliverySlot: "",
    address: "",
    paymentMethod: "sinpe",
    notes: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.price,
            selectedIngredients: item.selectedIngredients,
            notes: item.notes,
          })),
        }),
      });

      if (res.ok) {
        const { orderNumber } = await res.json();
        clearCart();
        router.push(`/checkout/confirmacion?order=${orderNumber}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push("/carrito");
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <Container>
          <Heading level={1} className="mb-8">
            Checkout
          </Heading>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                {/* Contact info */}
                <section>
                  <Heading level={3} className="mb-4">
                    Información de contacto
                  </Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre completo"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                    <Input
                      label="Teléfono"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                </section>

                {/* Delivery */}
                <section>
                  <Heading level={3} className="mb-4">
                    Entrega
                  </Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Método de entrega"
                      options={[
                        { value: "delivery", label: "Delivery" },
                        { value: "pickup", label: "Pick Up" },
                      ]}
                      value={form.deliveryMethod}
                      onChange={(e) => update("deliveryMethod", e.target.value)}
                    />
                    <Input
                      label="Fecha de entrega"
                      type="date"
                      required
                      min={minDateStr}
                      value={form.deliveryDate}
                      onChange={(e) => update("deliveryDate", e.target.value)}
                      hint="Mínimo 2 días de anticipación"
                    />
                    <Select
                      label="Franja horaria"
                      placeholder="Seleccioná una franja"
                      options={slots.map((s) => ({
                        value: String(s.id),
                        label: s.label,
                      }))}
                      value={form.deliverySlot}
                      onChange={(e) => update("deliverySlot", e.target.value)}
                    />
                    {form.deliveryMethod === "delivery" && (
                      <div className="sm:col-span-2">
                        <Textarea
                          label="Dirección de entrega"
                          required
                          placeholder="Dirección completa, referencias..."
                          value={form.address}
                          onChange={(e) => update("address", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Payment */}
                <section>
                  <Heading level={3} className="mb-4">
                    Método de pago
                  </Heading>
                  <Select
                    label="Pago"
                    options={[
                      { value: "sinpe", label: "Sinpe Móvil" },
                      { value: "transfer", label: "Transferencia / Depósito BAC" },
                    ]}
                    value={form.paymentMethod}
                    onChange={(e) => update("paymentMethod", e.target.value)}
                  />
                  <p className="mt-2 text-sm text-stone-500">
                    Después de hacer el pedido recibirás las instrucciones de pago
                    por email. El pedido se confirma con el 100% del pago.
                  </p>
                </section>

                {/* Notes */}
                <section>
                  <Textarea
                    label="Notas del pedido"
                    placeholder="¿Algo más que debamos saber?"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                  />
                </section>
              </div>

              {/* Summary */}
              <div>
                <CartSummary subtotal={getTotal()} showCheckout={false} />
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full mt-4"
                  loading={loading}
                >
                  Confirmar pedido
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
}
