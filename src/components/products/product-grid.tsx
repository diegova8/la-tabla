import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  basePath: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

export function ProductGrid({
  products,
  basePath,
  columns = 3,
  className,
}: ProductGridProps) {
  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} basePath={basePath} />
      ))}
    </div>
  );
}
