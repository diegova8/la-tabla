import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  title: string;
  description?: string;
  products: Product[];
  basePath: string;
  viewAllHref: string;
  viewAllLabel?: string;
}

export function FeaturedProducts({
  title,
  description,
  products,
  basePath,
  viewAllHref,
  viewAllLabel = "Ver todo",
}: FeaturedProductsProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="flex items-end justify-between mb-10">
          <div>
            <Heading level={2}>{title}</Heading>
            {description && (
              <p className="mt-2 text-stone-500 max-w-lg">{description}</p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-900 transition-colors"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductGrid products={products} basePath={basePath} />

        <div className="mt-8 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
