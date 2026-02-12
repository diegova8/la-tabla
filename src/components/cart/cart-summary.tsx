import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/ui/price";

interface CartSummaryProps {
  subtotal: number;
  deliveryCost?: number;
  discount?: number;
  showCheckout?: boolean;
}

export function CartSummary({
  subtotal,
  deliveryCost = 0,
  discount = 0,
  showCheckout = true,
}: CartSummaryProps) {
  const total = subtotal + deliveryCost - discount;

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-stone-900 mb-4">Resumen</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-600">Subtotal</span>
          <Price amount={subtotal} size="sm" />
        </div>

        {deliveryCost > 0 && (
          <div className="flex justify-between">
            <span className="text-stone-600">Envío</span>
            <Price amount={deliveryCost} size="sm" />
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Descuento</span>
            <span>-{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(discount)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between">
          <span className="font-semibold text-stone-900">Total</span>
          <Price amount={total} size="md" />
        </div>
      </div>

      {showCheckout && (
        <Link href="/checkout" className="block mt-6">
          <Button variant="gold" className="w-full" size="lg">
            Proceder al pago
          </Button>
        </Link>
      )}
    </div>
  );
}
