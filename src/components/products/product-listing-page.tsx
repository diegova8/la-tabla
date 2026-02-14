import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { ReactNode } from "react";

interface ProductListingPageProps {
  type: string;
  title: string;
  description: string;
  basePath: string;
  emptyIcon: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}

export async function ProductListingPage({
  type,
  title,
  description,
  basePath,
  emptyIcon,
  emptyTitle = "Próximamente",
  emptyDescription = "Estamos preparando esta sección. ¡Volvé pronto!",
}: ProductListingPageProps) {
  const items = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.type, type),
        eq(products.isActive, true)
      )
    )
    .orderBy(products.displayOrder);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <Heading level={1}>{title}</Heading>
          <p className="mt-3 text-stone-500 max-w-xl">{description}</p>
        </div>

        {items.length > 0 ? (
          <ProductGrid products={items} basePath={basePath} />
        ) : (
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
          />
        )}
      </Container>
    </section>
  );
}
