import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { CalendarHeart } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { PRODUCT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios — Eventos & Private Chef",
  description:
    "Paquetes para eventos grandes, servicio de private chef a domicilio. Cotizá tu evento especial.",
};

export default async function ServiciosPage() {
  const servicios = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.type, PRODUCT_TYPES.SERVICIO),
        eq(products.isActive, true)
      )
    )
    .orderBy(products.displayOrder);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <Heading level={1}>Servicios</Heading>
          <p className="mt-3 text-stone-500 max-w-xl">
            Mesas de charcutería para eventos grandes y servicio de private chef
            a domicilio. Todo preparado y servido por el chef.
          </p>
        </div>

        {servicios.length > 0 ? (
          <ProductGrid products={servicios} basePath="/servicios" />
        ) : (
          <EmptyState
            icon={<CalendarHeart className="h-12 w-12" />}
            title="Próximamente"
            description="Estamos preparando nuestros servicios. ¡Volvé pronto!"
          />
        )}
      </Container>
    </section>
  );
}
