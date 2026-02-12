"use client";

import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <Container>
          <Heading level={1} className="mb-8">
            Carrito
          </Heading>

          {items.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag className="h-12 w-12" />}
              title="Tu carrito está vacío"
              description="Explorá nuestras tablas y agregá lo que más te guste."
              action={
                <Link href="/tablas">
                  <Button variant="gold">Ver tablas</Button>
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="divide-y divide-stone-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <CartSummary subtotal={getTotal()} />
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
