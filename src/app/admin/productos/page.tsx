export const dynamic = "force-dynamic";

import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { EmptyState } from "@/components/ui/empty-state";
import { Package } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductsClient } from "./products-client";

const typeLabels: Record<string, string> = {
  tabla: "Tabla",
  especialidad: "Especialidad",
  servicio: "Servicio",
  taller: "Taller",
};

export default async function AdminProductosPage() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(products.type, products.displayOrder);

  return (
    <div>
      <ProductsClient products={allProducts} typeLabels={typeLabels} />
    </div>
  );
}
