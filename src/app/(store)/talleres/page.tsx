import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PRODUCT_TYPES } from "@/lib/constants";
import { ProductListingPage } from "@/components/products/product-listing-page";

export const metadata: Metadata = {
  title: "Talleres — Aprendé a armar tu tabla",
  description:
    "Clases de montaje de tablas a domicilio y talleres virtuales. Incluye materiales.",
};

export default function TalleresPage() {
  return (
    <ProductListingPage
      type={PRODUCT_TYPES.TALLER}
      title="Talleres"
      description="Aprendé a crear tus propias tablas de charcutería con clases presenciales y virtuales."
      basePath="/talleres"
      emptyIcon={<GraduationCap className="h-12 w-12" />}
      emptyDescription="Estamos preparando nuestros talleres. ¡Volvé pronto!"
    />
  );
}
