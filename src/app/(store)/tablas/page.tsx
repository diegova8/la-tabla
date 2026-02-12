import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Package } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { PRODUCT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tablas de Charcutería & Quesos",
  description:
    "Explorá nuestras tablas de charcutería y quesos artesanales. Personalizá los ingredientes y pedí online.",
};

export default async function TablasPage() {
  const tablas = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.type, PRODUCT_TYPES.TABLA),
        eq(products.isActive, true)
      )
    )
    .orderBy(products.displayOrder);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <Heading level={1}>Tablas</Heading>
          <p className="mt-3 text-stone-500 max-w-xl">
            Charcutería & quesos artesanales. Elegí tu tabla y personalizá los
            ingredientes a tu gusto.
          </p>
        </div>

        {tablas.length > 0 ? (
          <ProductGrid products={tablas} basePath="/tablas" />
        ) : (
          <EmptyState
            icon={<Package className="h-12 w-12" />}
            title="Próximamente"
            description="Estamos preparando nuestro catálogo de tablas. ¡Volvé pronto!"
          />
        )}
      </Container>
    </section>
  );
}
