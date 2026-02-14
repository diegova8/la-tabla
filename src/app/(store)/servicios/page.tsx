import type { Metadata } from "next";
import { CalendarHeart } from "lucide-react";
import { PRODUCT_TYPES } from "@/lib/constants";
import { ProductListingPage } from "@/components/products/product-listing-page";

export const metadata: Metadata = {
  title: "Servicios — Eventos & Private Chef",
  description:
    "Paquetes para eventos grandes, servicio de private chef a domicilio. Cotizá tu evento especial.",
};

export default function ServiciosPage() {
  return (
    <ProductListingPage
      type={PRODUCT_TYPES.SERVICIO}
      title="Servicios"
      description="Mesas de charcutería para eventos grandes y servicio de private chef a domicilio. Todo preparado y servido por el chef."
      basePath="/servicios"
      emptyIcon={<CalendarHeart className="h-12 w-12" />}
      emptyDescription="Estamos preparando nuestros servicios. ¡Volvé pronto!"
    />
  );
}
