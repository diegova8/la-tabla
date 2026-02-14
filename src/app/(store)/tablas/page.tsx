import type { Metadata } from "next";
import { Package } from "lucide-react";
import { PRODUCT_TYPES } from "@/lib/constants";
import { ProductListingPage } from "@/components/products/product-listing-page";

export const metadata: Metadata = {
  title: "Tablas de Charcutería & Quesos",
  description:
    "Explorá nuestras tablas de charcutería y quesos artesanales. Personalizá los ingredientes y pedí online.",
};

export default function TablasPage() {
  return (
    <ProductListingPage
      type={PRODUCT_TYPES.TABLA}
      title="Tablas"
      description="Charcutería & quesos artesanales. Elegí tu tabla y personalizá los ingredientes a tu gusto."
      basePath="/tablas"
      emptyIcon={<Package className="h-12 w-12" />}
      emptyDescription="Estamos preparando nuestro catálogo de tablas. ¡Volvé pronto!"
    />
  );
}
