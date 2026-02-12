import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  basePath: string; // /tablas, /especialidades, etc.
  className?: string;
}

export function ProductCard({ product, basePath, className }: ProductCardProps) {
  const href = `${basePath}/${product.slug}`;

  return (
    <Link href={href} className={cn("group block", className)}>
      <article className="overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-300">
              <span className="text-4xl">🧀</span>
            </div>
          )}
          {product.isConfigurable && (
            <Badge variant="gold" className="absolute top-3 left-3">
              Personalizable
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          {product.shortDesc && (
            <p className="mt-1 text-sm text-stone-500 line-clamp-2">
              {product.shortDesc}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <Price amount={product.price} />
            {(product.personsMin || product.personsMax) && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Users className="h-3.5 w-3.5" />
                {product.personsMin === product.personsMax
                  ? product.personsMin
                  : `${product.personsMin}-${product.personsMax}`}{" "}
                pers.
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
