import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { GraduationCap } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { PRODUCT_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Talleres — Aprendé a armar tu tabla",
  description:
    "Clases de montaje de tablas a domicilio y talleres virtuales. Incluye materiales.",
};

export default async function TalleresPage() {
  const talleres = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.type, PRODUCT_TYPES.TALLER),
        eq(products.isActive, true)
      )
    )
    .orderBy(products.displayOrder);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <Heading level={1}>Talleres</Heading>
          <p className="mt-3 text-stone-500 max-w-xl">
            Aprendé a crear tus propias tablas de charcutería con clases
            presenciales y virtuales.
          </p>
        </div>

        {talleres.length > 0 ? (
          <ProductGrid products={talleres} basePath="/talleres" />
        ) : (
          <EmptyState
            icon={<GraduationCap className="h-12 w-12" />}
            title="Próximamente"
            description="Estamos preparando nuestros talleres. ¡Volvé pronto!"
          />
        )}
      </Container>
    </section>
  );
}
