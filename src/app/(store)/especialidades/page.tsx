import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { ChefHat } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { PRODUCT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Especialidades del Chef",
  description:
    "Descubrí las especialidades del Chef Stewart: paella, risotto, tortilla de patata y más.",
};

export default async function EspecialidadesPage() {
  const especialidades = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.type, PRODUCT_TYPES.ESPECIALIDAD),
        eq(products.isActive, true)
      )
    )
    .orderBy(products.displayOrder);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <Heading level={1}>Especialidades</Heading>
          <p className="mt-3 text-stone-500 max-w-xl">
            Platillos únicos del Chef Stewart, preparados con ingredientes selectos
            y técnicas artesanales.
          </p>
        </div>

        {especialidades.length > 0 ? (
          <ProductGrid products={especialidades} basePath="/especialidades" />
        ) : (
          <EmptyState
            icon={<ChefHat className="h-12 w-12" />}
            title="Próximamente"
            description="Estamos preparando nuestras especialidades. ¡Volvé pronto!"
          />
        )}
      </Container>
    </section>
  );
}
