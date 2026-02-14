import type { Metadata } from "next";
import { ChefHat } from "lucide-react";
import { PRODUCT_TYPES } from "@/lib/constants";
import { ProductListingPage } from "@/components/products/product-listing-page";

export const metadata: Metadata = {
  title: "Especialidades del Chef",
  description:
    "Descubrí las especialidades del Chef Stewart: paella, risotto, tortilla de patata y más.",
};

export default function EspecialidadesPage() {
  return (
    <ProductListingPage
      type={PRODUCT_TYPES.ESPECIALIDAD}
      title="Especialidades"
      description="Platillos únicos del Chef Stewart, preparados con ingredientes selectos y técnicas artesanales."
      basePath="/especialidades"
      emptyIcon={<ChefHat className="h-12 w-12" />}
      emptyDescription="Estamos preparando nuestras especialidades. ¡Volvé pronto!"
    />
  );
}
